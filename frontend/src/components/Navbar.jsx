import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import profile_icon from "../assets/icons/profile_icon.png";
import cart_icon from "../assets/icons/cart_icon.png";
import menu_icon from "../assets/icons/menu_icon.png";
import search_icon from "../assets/icons/search_icon.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVisible } from "../store/searchSlice";
import { saveToken } from "../store/authSlice";
import { fetchProductData } from "../store/productSlice";
import { updateCart } from "../store/cartSlice";
import axios from "axios"
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart_items = useSelector((store) => store.cart.cart_items);
  let total_items = cart_items && cart_items.reduce((total, item) => total + item.quantity, 0);
  const location = useLocation();
  const pathName = location.pathname;
  const token = localStorage.getItem('token');
  
  const dropdownRef = useRef();

  const isActive = (path) => pathName === path;

  const handleProfileClick = () => {
    if (token) {
      setProfileDropdown((prev) => !prev);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(saveToken(null));
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState([]);
  const getCartData = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/get`, {}, { headers: { token } });
        if (response.data.success) {
            setCartItems(response.data.cart);
           

        } else {
            console.log(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};



  useEffect(()=>{
    dispatch(fetchProductData())
    getCartData();
  },[])






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


  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="sticky top-0 left-0 right-0 z-10 flex items-center justify-between w-full h-20 px-[4%] bg-white"
      >
        <div className="flex items-center justify-between w-full pb-3 border-b border-gray-300">
          <img
            src={Logo}
            alt=""
            className="w-32 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <ul className="items-center hidden uppercase lg:flex md:text-lg md:gap-7">
            {["/", "/collection", "/about", "/contact"].map((path, index) => {
              const labels = ["home", "collection", "about", "contact"];
              return (
                <li key={index} className="flex flex-col items-center justify-center text-sm font-medium">
                  <Link to={path}>{labels[index]}</Link>
                  <span className={`w-1/2 h-[1px] block ${isActive(path) ? 'bg-black' : 'bg-transparent'}`}></span>
                </li>
              );
            })}
            
          </ul>

          <div className="flex gap-5 cursor-pointer md:gap-8">
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleProfileClick}>
                <img src={profile_icon} alt="" className="w-5 h-5" />
              </button>
              {/* Profile Dropdown */}
              {profileDropdown && (
                <div className="absolute right-0 z-10 w-48 mt-2 bg-white rounded-lg shadow-lg">
                  <ul>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => navigate('/profile')}>
                      My Profile
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={handleLogout}>
                      Logout
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-200" onClick={() => navigate('/orders')}>
                      Orders
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link to={"/collection"}>
              <img
                src={search_icon}
                alt=""
                className="w-5 h-5"
                onClick={() => dispatch(setSearchVisible(true))}
              />
            </Link>

            <div className="relative">
              <Link to={"/cart"}>
                <img src={cart_icon} alt="" className="w-5 h-5" />
              </Link>
              <span className="flex items-center justify-center w-[18px] h-[18px] text-[10px] text-white bg-black rounded-full font-prata absolute bottom-[-50%] right-[-50%] translate-y-[-50%]">
                {total_items}
              </span>
            </div>
          </div>

          <img
            src={menu_icon}
            className="w-5 h-5 lg:hidden"
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 h-full bg-white shadow-lg"
            initial={{ y: "-80px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            exit={{ y: "-80px", opacity: 0 }}
          >
            <RxCross2
              className="absolute text-2xl right-10 top-5"
              onClick={() => setOpenMenu(false)}
            />
            <ul className="flex flex-col px-10 py-20 text-3xl text-right uppercase gap-7">
              {["/", "/collection", "/about", "/contact"].map((path, index) => {
                const labels = ["home", "collection", "about", "contact"];
                return (
                  <li key={index} className="transition duration-300 hover:text-pink-500">
                    <Link to={path}>{labels[index]}</Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
