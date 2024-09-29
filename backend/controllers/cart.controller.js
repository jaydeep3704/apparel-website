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
        if(userId)
            {
                const userData=await userModel.findById(userId)
                let cartData=await userData.cartData
                cartData[itemId][size]=quantity
                await userModel.findByIdAndUpdate(userId,{cartData})
                res.json({success:true,message:"added to cart"})
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

export {addToCart,updateCart,getUserCart}