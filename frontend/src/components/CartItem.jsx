import React, { useState, useEffect } from "react";
import bin from "../assets/icons/bin_icon.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { removeFromCart } from "../store/cartSlice";
import {useDispatch} from "react-redux"
import { updateQuantity } from "../store/cartSlice";
const CartItem = ({ id, size, quantity }) => {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [product, setProduct] = useState(null);
    const token = localStorage.getItem('token');
    const dispatch=useDispatch()
    const fetchSingleProduct = async () => {
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/product/single`, { id });
            if (response.data.success) {
                const item = response.data.product;
                setProduct(item);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateCart = async (newQuantity) => {
        try {
            const data = {
                itemId: id,
                size,
                quantity: newQuantity
            };
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/update`, data, {
                headers: { token }
            });
            if (response.data.success) {
                dispatch(updateQuantity({
                    id,
                    size,
                    quantity:newQuantity
                }))
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || "Failed to update cart");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleIncrement = () => {
        const newQuantity = itemQuantity + 1;
        setItemQuantity(newQuantity);
      
        updateCart(newQuantity);
       
    };

    const handleDecrement = () => {
        if (itemQuantity > 1) {
            const newQuantity = itemQuantity - 1;
            setItemQuantity(newQuantity);
            updateCart(newQuantity);
            
        }
    };

    const handleRemove = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, { itemId: id,size }, { headers: { token } });
            if (response.data.success) {
                console.log(id,size)
                dispatch(removeFromCart({id,size}))
            } else {
                toast.error(response.data.message || "Failed to remove item");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchSingleProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className="flex flex-col items-center justify-between w-full p-5 pr-10 border-b border-gray-300 md:flex-row">
            <div className="flex gap-5">
                <div className="w-24 h-28 bg-slate-100">
                    <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-medium">{product.name}</h2>
                    <div className="flex items-center gap-4">
                        <span className="font-medium">₹ {product.price}</span>
                        <span className="px-3 py-2 bg-gray-100">{size}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full mt-3 md:w-1/2">
                <div className="px-1 py-2 text-sm border border-gray-300">
                    <button className="px-2" onClick={handleDecrement}>
                        <FaMinus className="text-xs" />
                    </button>
                    <span className="px-3 border-gray-300 border-x">{itemQuantity}</span>
                    <button className="px-2" onClick={handleIncrement}>
                        <FaPlus className="text-xs" />
                    </button>
                </div>
                
                <img
                    src={bin}
                    alt="Remove"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleRemove} // Call handleRemove when clicked
                />
            </div>
        </div>
    );
};

export default CartItem;
