import React from "react";
import { FaChevronRight } from "react-icons/fa";
import MensFashion from "../assets/mensFashion.png";
import WomensFashion from "../assets/womensFashion.png";
import Shoes from "../assets/shoes.png";
import Watch from "../assets/watch.png";
import HandBag from "../assets/handbag.png";
import BackPack from "../assets/backpack.png"
const Category = () => {
  return (
    // Category Container 
    <div className="w-full">
     {/* Mens Womens Category */}
      <div className="relative flex flex-col gap-5 p-5 md:flex-row md:px-10">
        <div className="w-full h-[450px] p-5  bg-slate-100 flex items-center overflow-hidden relative flex-col md:flex-row">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold md:text-xl">Weekend Sale</h4>
            <h2 className="text-3xl font-bold md:text-5xl">Men's Fashion</h2>
            <h3 className="text-xl md:text-3xl">
              Flat <span className="font-bold text-blue-500">70% off</span>
            </h3>
            <p className="font-semibold text-blue-500 uppercase md:text-xl">
              shop now
            </p>
          </div>
          <div className="w-1/2 h-full overflow-hidden">
            <img
              src={MensFashion}
              alt=""
              className="absolute object-cover bottom-1 h-[300px] md:h-full"
            />
          </div>
        </div>
        <div className="w-full h-[450px] p-5 bg-slate-100 flex items-center overflow-hidden relative flex-col md:flex-row">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold md:text-xl">Weekend Sale</h4>
            <h2 className="text-3xl font-bold md:text-5xl">Women's Fashion</h2>
            <h3 className="text-xl md:text-3xl">
              Flat <span className="font-bold text-pink-500">Flat 40% off</span>
            </h3>
            <p className="font-semibold text-pink-500 uppercase md:text-xl">
              shop now{" "}
            </p>
          </div>
          <div className="w-1/2 h-full">
            <img
              src={WomensFashion}
              alt=""
              className="absolute object-cover left-6 md:left-80"
            />
          </div>
        </div>
      </div>


     
    </div>
  );
};

export default Category;
