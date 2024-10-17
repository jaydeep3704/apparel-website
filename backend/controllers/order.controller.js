//Place order using COD Method
import orderModel from "../models/order.models.js";
import userModel from "../models/user.models.js";
const placeOrder=async (req,res)=>{
    try {
        const {userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:date.now()
        }

        const newOrder=new orderModel(orderData)
        await newOrder.save()
        await userModel.findByIdAndUpdate(userId,{cart:{}})
        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
//Place order using Stripe Method

const placeOrderStripe=async (req,res)=>{

}
//Place order using Razorpay Method

const placeOrderRazorpay=async (req,res)=>{

}

//All Orders Data for admin Panel

const allOrders=(req,res)=>{

}


//user orders for frontend
const userOrders=(req,res)=>{

}

//update Order status from adminPanel
const updateStatus=(req,res)=>{

}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}