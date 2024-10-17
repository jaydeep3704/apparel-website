import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from "../controllers/order.controller.js"
import {adminAuth} from "../middleware/adminAuth.js"
import authenticateUser from '../middleware/auth.js'
const orderRouter=express.Router()


//for admin panel
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment Features
orderRouter.post('/place',authenticateUser,placeOrder)
orderRouter.post('/stripe',authenticateUser,placeOrderStripe)
orderRouter.post('/razorpay',authenticateUser,placeOrderRazorpay)

//User Features
orderRouter.post('/userorders',authenticateUser,userOrders)

export default orderRouter
