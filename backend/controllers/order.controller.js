//Place order using COD Method
import orderModel from "../models/order.models.js";
import userModel from "../models/user.models.js";
import Stripe from "stripe";

//global variables
const currency='inr'
const deliveryCharge=50




const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

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
            date:Date.now()
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
    try {
        const {userId,items,amount,address}=req.body;
        const {origin}=req.headers
        const orderData={
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }
        const newOrder=new orderModel(orderData)
        await newOrder.save()
        
        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name,
                  
                },
                unit_amount:item.price*100
               
            },
            quantity:item.quantity
            
        }))

        line_items.push(({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges',
                  
                },
                unit_amount:deliveryCharge*100
               
            },
            quantity:1
        }))

        const session=await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        })

        res.json({success:true,session_url:session.url})
   
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//Place order using Razorpay Method

const placeOrderRazorpay=async (req,res)=>{

}

//All Orders Data for admin Panel

const allOrders=async (req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//user orders for frontend
const userOrders = async (req, res) => {
   
   try {
    const {userId}=req.body
    const orders=await orderModel.find({userId})
    res.json({success:true,orders})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
};

//update Order status from adminPanel
const updateStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
      await orderModel.findByIdAndUpdate(orderId, { status });
      return res.json({ success: true, message: "Status Updated" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}