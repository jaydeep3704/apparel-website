import React, { useState, useEffect } from "react";
import bin from "../assets/icons/bin_icon.png";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem = ({ image, name, price, id, size, quantity }) => {
  const dispatch = useDispatch();
  
  // Initialize local state with quantity prop
  const [itemQuantity, setItemQuantity] = useState(quantity);

  // Synchronize local state with props
  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity]);

  // Handle removal of item from cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ id, size }));
  };

  // Handle increment of item quantity
  const incrementQuantity = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    dispatch(updateQuantity({ id, size, quantity: newQuantity }));
  };

  // Handle decrement of item quantity
  const decrementQuantity = () => {
    if (itemQuantity > 1) { // Ensure quantity does not go below 1
      const newQuantity = itemQuantity - 1;
      setItemQuantity(newQuantity);
      dispatch(updateQuantity({ id, size, quantity: newQuantity }));
    } else {
      handleRemoveFromCart();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between w-full p-5 pr-10 border-b border-gray-300 md:flex-row">
      <div className="flex gap-5">
        <div className="w-24 h-28 bg-slate-100">
          <img src={image} alt={name} className="object-cover w-full h-full" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">{name}</h2>
          <div className="flex items-center gap-4">
            <span className="font-medium">${price}</span>
            <span className="px-3 py-2 bg-gray-100">{size}</span>
          </div>
        </div>
      </div>

    <div className="flex items-center justify-between w-full mt-3 md:w-1/2">
      <div className="px-1 py-2 text-sm border border-gray-300">
        <button className="px-2" onClick={decrementQuantity}>
          <FaMinus className="text-xs" />
        </button>
        <span className="px-3 border-gray-300 border-x">{itemQuantity}</span>
        <button className="px-2" onClick={incrementQuantity}>
          <FaPlus className="text-xs" />
        </button>
      </div>
      
      <img
        src={bin}
        alt="Remove"
        className="w-6 h-6 cursor-pointer"
        onClick={handleRemoveFromCart}
      />
      </div>
    </div>
  );
};

export default CartItem;
