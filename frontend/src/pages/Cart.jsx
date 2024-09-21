import React, { useEffect } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/icons/abandoned-cart.png";
import { setTotal } from "../store/cartSlice";



const Cart = () => {





  const deliveryFee=20
  const cartItems = useSelector((store) => store.cart.cart_items);
  const total=useSelector((store)=>store.cart.totalPrice)
  const dispatch=useDispatch()  
  useEffect(()=>{
     dispatch(setTotal())
  },[cartItems])
  
  


  return cartItems.length > 0 ? (
    <div className="px-5 md:px-40 sm:px-10">
      <div className="p-5">
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

        <div className="flex w-full mt-10 md:justify-end">
          <div className="flex flex-col w-full mt-8 lg:w-1/3">
            <div className="flex items-center gap-3 py-5 text-2xl ">
              <span className="font-medium text-gray-600">CART</span>
              <span className="font-medium text-black">TOTALS</span>
              <span className="w-[50px] h-[2px] block bg-black"></span>
            </div>
             <p className="flex justify-between py-2 border-b border-gray-300"><span>Subtotal</span><span>${total}</span></p>
             <p className="flex justify-between py-2 border-b border-gray-300"><span>Delivery Fee</span><span>${deliveryFee}</span></p>
             <p className="flex justify-between py-2 font-medium "><span>Total</span><span>${total+deliveryFee}</span></p>
             <button className="px-8 py-[10px] mt-5 font-medium text-white bg-black border-none outline-non self-end">PROCEED TO CHECKOUT</button>
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
