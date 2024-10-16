import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import star from "../assets/icons/star_icon.png";
import dullStar from "../assets/icons/star_dull_icon.png";
import { addToCart } from "../store/cartSlice";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import RelatedProducts from "../components/RelatedProducts";
import { backendURL } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
const SingleProduct = () => {
  const { id } = useParams();

  const products = useSelector((store) => store.product.products);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const token=useSelector((store)=>store.auth.token)

  const handleAddToCart = async () => {
    const {  _id } = productData;

    if (size !== "") {
        const itemData = {
          itemId: _id,
          quantity: quantity,
          size
      };

        dispatch(addToCart(itemData)); // Dispatch the item to the Redux store

        if (token) {
            try {
                const response = await axios.post(
                    `${backendURL}/api/cart/add`,
                    {
                        itemId: _id,
                        quantity: quantity,
                        size
                    },
                    { headers: { token } }
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message || "Failed to add to cart.");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while adding to cart.");
            }
        } else {
            toast.warning("User not authenticated. Please log in.");
        }
    } else {
        toast.warning("Select size.");
    }
};


  const fetchProductInfo = async () => {
    try {
      const product = products.filter((product) => {
        return product._id === id;
      })[0];
      setProductData(product);
      setImage(product.images[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  return productData ? (
    <div className="w-full pt-10 transition-opacity duration-500 ease-in opacity-100 px-[4%]  ">
      <div className="flex flex-wrap justify-center h-full gap-10 ">
        <div className="md:w-[580px]  w-full sm:w-1/2 mb-5">
          <div className=" md:h-[65vh] rounded-lg overflow-hidden mx-auto">
            <img src={image} alt="" className="object-top w-full " />
          </div>
          <div className="flex gap-2 mt-5">
            {productData.images.map((image, index) => {
              return (
                <div
                  className="w-[24%] rounded-md overflow-hidden"
                  key={index}
                  onClick={() => setImage(image)}
                >
                  <img
                    src={image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col  w-full  md:flex-1  bg-slate-50 p-[4%] gap-5 rounded-xl">
          <h1 className="text-2xl font-semibold lg:text-5xl md:text-4xl  mt-[10%]">
            {productData.name}
          </h1>
          <p className="text-sm font-medium text-gray-600 md:w-3/4 md:text-lg">
            {productData.description}
          </p>
          <p className="flex items-center gap-3 text-lg font-bold md:text-2xl">
            ₹ {productData.price}{" "}
            <span className="px-3 py-2 text-sm text-[#FF7D6E] bg-[#FEEFE2] rounded-md">
              50%
            </span>
          </p>
          <p className="text-lg line-through">₹ {productData.price + 400}</p>
          <hr className="w-full h-[2px] bg-[#FF7D6E]" />
          <div>
            <p className="text-xl font-medium">Select Size</p>
            <div className="flex gap-2 mt-3">
              <span
                className={`md:px-5 px-3 py-2 cursor-pointer rounded-lg font-semibold text-lg ${
                  size === "S"
                    ? "text-white bg-[#e45040]"
                    : "text-[#FF7D6E] bg-[#FEEFE2]"
                }`}
                onClick={() => setSize("S")}
              >
                S
              </span>
              <span
                className={`md:px-5 px-3 py-2 cursor-pointer rounded-lg font-semibold text-lg ${
                  size === "M"
                    ? "text-white bg-[#e45040]"
                    : "text-[#FF7D6E] bg-[#FEEFE2]"
                }`}
                onClick={() => setSize("M")}
              >
                M
              </span>
              <span
                className={`md:px-5 px-3 py-2 cursor-pointer rounded-lg font-semibold text-lg ${
                  size === "L"
                    ? "text-white bg-[#e45040]"
                    : "text-[#FF7D6E] bg-[#FEEFE2]"
                }`}
                onClick={() => setSize("L")}
              >
                L
              </span>
              <span
                className={`md:px-5 px-3 py-2 cursor-pointer rounded-lg font-semibold text-lg ${
                  size === "XL"
                    ? "text-white bg-[#e45040]"
                    : "text-[#FF7D6E] bg-[#FEEFE2]"
                }`}
                onClick={() => setSize("XL")}
              >
                XL
              </span>
              <span
                className={`md:px-5 px-3 py-2 cursor-pointer rounded-lg font-semibold text-lg ${
                  size === "XXL"
                    ? "text-white bg-[#e45040]"
                    : "text-[#FF7D6E] bg-[#FEEFE2]"
                }`}
                onClick={() => setSize("XXL")}
              >
                XXL
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center px-5 py-2 bg-[#ebecee]">
              <button
                className="px-2 text-lg  text-[#FF7D6E] font-bold cursor-pointer"
                onClick={handleDecrement}
                disabled={quantity == 1}
              >
                <FiMinus />
              </button>
              <span className="px-3 text-lg font-bold">{quantity}</span>
              <button
                className="px-2 text-lg text-[#FF7D6E] font-bold cursor-pointer"
                onClick={handleIncrement}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button className="text-center w-[250px] bg-[#e45040] border-none outline-none text-white  py-2 text-md font-semibold rounded-lg hover:bg-[#fa6150]  " onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        products={products}
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default SingleProduct;
