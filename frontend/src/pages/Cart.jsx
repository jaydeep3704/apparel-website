import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import emptyCart from "../assets/icons/abandoned-cart.png";
import { useNavigate } from "react-router-dom";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { updateCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [cartData, setCartData] = useState([]);
    const dispatch=useDispatch()
    const cart_items=useSelector((store)=>store.cart.cart_items)
    const getCartData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/cart/get", {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cart);
               

            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getCartData();
        
    }, []);

    useEffect(() => {
        const temp_data = [];

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    temp_data.push({
                        _id: items,
                        quantity: cartItems[items][item],
                        size: item
                    });
                }
            }
        }

        setCartData(temp_data);
        dispatch(updateCart(temp_data))
    }, [cartItems]);

    return cart_items.length > 0 ? (
        <div className="px-[4%]">
            <div>
                <div className="flex items-center gap-3 py-5 text-2xl border-b border-gray-300">
                    <span className="font-medium text-gray-600">YOUR</span>
                    <span className="font-medium text-black">CART</span>
                    <span className="w-[50px] h-[2px] block bg-black"></span>
                </div>
    
                <div>
                    {cart_items.map((item) => {
                        const { _id, quantity, size } = item;
                        return (
                            <CartItem
                                id={_id}
                                size={size}
                                quantity={quantity}
                                key={`${_id}-${size}`} // Unique key by combining _id and size
                            />
                        );
                    })}
                </div>
    
                <div className="flex justify-end w-full">
                    <div className="flex flex-col items-end w-full lg:w-1/3">
                        <CartTotal />
                        <button
                            className="lg:w-1/2 w-full py-2.5 mt-5 font-semibold text-white bg-black text-md"
                            onClick={() => navigate('/place-order')}
                        >
                            PROCEED TO CHECKOUT
                        </button>
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