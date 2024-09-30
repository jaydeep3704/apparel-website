import userModel from "../models/user.models.js"

const addToCart = async (req, res) => {
   try {
     
     const {itemId,quantity,size,userId}=req.body
     const userData=await userModel.findById(userId)
     let cart=userData.cart
     if(userData)
     {
        if(cart[itemId])
        {
            if(cart[itemId][size])
            {
                cart[itemId][size]+=quantity
            }
            else{
                cart[itemId][size]=quantity
            }
        }
        else{
            cart[itemId]={}
            cart[itemId][size]=quantity
        }

        await userModel.findByIdAndUpdate(userId,{cart})
        res.json({success:true,message:"Item Added to Cart"})
     }


   } catch (error) {
     console.log(error)
     res.json({success:true,message:error.message})
   }
       
};


const updateCart=async(req,res)=>{
    try {
        const {userId,itemId,size,quantity}=req.body
        console.log(quantity)
        if(userId)
            {
                const userData=await userModel.findById(userId)
               
                let cart=await userData.cart
                
                cart[itemId][size]=quantity
                
                await userModel.findByIdAndUpdate(userId,{cart})
                res.json({success:true,message:"Cart Updated"})
            }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const getUserCart=async(req,res)=>{
    try {
        const {userId}=req.body
        const userData=await userModel.findById(userId)
        let cart=await userData.cart
        res.json({success:true,cart})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ success: false, message: "Missing userId, itemId, or size." });
        }

       
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        
        let cart = userData.cart;

      
        if (cart[itemId] && cart[itemId][size]) {
            
            delete cart[itemId][size];

            if (Object.keys(cart[itemId]).length === 0) {
                delete cart[itemId];
            }

         
            await userModel.findByIdAndUpdate(userId, { cart });
            return res.json({ success: true, message: "Item removed from cart." });
        } else {
            return res.status(404).json({ success: false, message: "Item not found in cart." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export {addToCart,updateCart,getUserCart,removeFromCart}