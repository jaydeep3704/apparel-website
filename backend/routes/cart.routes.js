import express from "express"
import { addToCart,updateCart,getUserCart, removeFromCart } from "../controllers/cart.controller.js"
import authenticateUser from "../middleware/auth.js"

const cartRouter=express.Router()

cartRouter.post('/get',authenticateUser,getUserCart)
cartRouter.post('/add',authenticateUser,addToCart)
cartRouter.post('/update',authenticateUser,updateCart)
cartRouter.post('/remove',authenticateUser,removeFromCart)

export default cartRouter
