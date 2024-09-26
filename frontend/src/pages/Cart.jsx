import React from "react";
import CartItem from "../components/CartItem";
import {  useSelector } from "react-redux";
import emptyCart from "../assets/icons/abandoned-cart.png";

import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";



const Cart = () => {




  const cartItems = useSelector((store) => store.cart.cart_items);
  const navigate=useNavigate()

 
  


  return cartItems.length > 0 ? (
    <div className="px-[4%]">
      <div className="">
        <div className="flex items-center gap-3 py-5 text-2xl border-b border-gray-300">
          <span className="font-medium text-gray-600">YOUR</span>
          <span className="font-medium text-black">CART</span>
          <span className="w-[50px] h-[2px] block bg-black"></span>
        </div>

        <div>
          {cartItems.map((item) => {
            const { image, name, price, id, size, quantity } = item;
            return (
              <CartItem
                image={image}
                name={name}
                price={price}
                id={id}
                key={id}
                size={size}
                quantity={quantity}
              />
            );
          })}
        </div>

          <div className="flex justify-end w-full">
            <div className="flex flex-col items-end w-full lg:w-1/3">
              <CartTotal/>
              <button className="lg:w-1/2 w-full py-2.5 mt-5 font-semibold text-white bg-black text-md " onClick={()=>navigate('/place-order')}>PROCEED TO CHECKOUT</button>
            </div>
          
          </div>
       
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center w-full h-[60vh] flex-col gap-5">
      <img src={emptyCart} alt="" className="w-40 h-40" />
      <div className="text-3xl font-medium ">Your Cart is Empty</div>
      <div className="text-lg">Add something to make it happy</div>
    </div>
  );
};

export default Cart;
