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

const placeOrderStripe = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
      const { origin } = req.headers;
  
      // Order data to store in the database
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Stripe",
        payment: false,
        date: Date.now()
      };
  
      // Save new order to the database
      const newOrder = new orderModel(orderData);
      await newOrder.save();
  
      // Map line items for Stripe checkout
      const line_items = items.map((item) => ({
        price_data: {
          currency: currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Price in cents
        },
        quantity: item.quantity,
      }));
  
      // Add delivery charge
      line_items.push({
        price_data: {
          currency: currency,
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: deliveryCharge * 100, // Delivery charge in cents
        },
        quantity: 1,
      });
  
      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: "payment",
      });
  
      // Return session URL to the frontend
      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

const verifyStripe=async (req,res)=>{
    const {orderId,success,userId}=req.body
    
    try {
        if(success==="true")
        {
            console.log("SUccess")
            await orderModel.findByIdAndUpdate(orderId,{
                payment:true
            })
            await userModel.findByIdAndUpdate(userId,{cart:{}})
            res.json({success:true})
        }
        else{
            console.log("Failure")
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
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
  

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}