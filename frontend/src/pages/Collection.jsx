import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { fetchProductData } from "../store/productSlice";
const Collection = () => {
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const searchText = useSelector((store) => store.search.searchText);
  const products = useSelector((store) => store.product.products);
  const loading = useSelector((store) => store.product.loading);
  const error = useSelector((store) => store.product.error);

  useEffect(() => {
    if (products === null) {
      dispatch(fetchProductData());
    }
  }, [products, dispatch]);

  const toggleCategory = (e) => {
    if (e.target.checked) {
      setCategories((prev) => [...prev, e.target.value]);
    } else {
      const categoryList = categories.filter(
        (category) => category !== e.target.value
      );
      setCategories(categoryList);
    }
  };

  const toggleSubCategory = (e) => {
    if (e.target.checked) {
      setSubcategories((prev) => [...prev, e.target.value]);
    } else {
      const subcategoryList = subcategories.filter(
        (subcategory) => subcategory !== e.target.value
      );
      setSubcategories(subcategoryList);
    }
  };

  const applyFilter = () => {
    if (!products) return;

    let productsCopy = products.slice();

    if (searchText !== "") {
      productsCopy = productsCopy.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (categories.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        categories.includes(product.category)
      );
    }
    if (subcategories.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        subcategories.includes(product.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [categories, subcategories, searchText, products]);

  const sortProducts = (e) => {
    let fpCopy = filteredProducts.slice();

    switch (e.target.value) {
      case "lowtohigh":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "hightolow":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilteredProducts(fpCopy);
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="flex flex-col justify-between gap-10 px-[4%] mt-10  md:flex-row">
      {/* Filters */}
      <div className="flex flex-col gap-5 lg:w-[20%] w-full">
        <p className="mb-3 text-xl font-medium uppercase">Filters</p>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Categories</p>
          <div className="flex flex-col gap-2 mt-5">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" onChange={toggleCategory} value={cat} />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <div className="w-full py-5 pl-5 border border-gray-300">
          <p className="text-lg font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 mt-5">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input type="checkbox" value={type} onChange={toggleSubCategory} />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="md:w-[78%]">
        <div className="flex justify-between">
          <div className="flex items-center w-full gap-3 md:text-2xl text-xl font-[400]">
            <span className="text-gray-600">ALL</span>
            <span className="text-gray-800">COLLECTIONS</span>
            <span className="block w-[50px] h-[2px] bg-black"></span>
          </div>
          <div>
            <select className="px-3 py-2 border border-gray-300" onChange={sortProducts}>
              <option value="relevant">Sort By : Relevant</option>
              <option value="lowtohigh">Sort By : Low to High</option>
              <option value="hightolow">Sort By : High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards */}
        <div className="grid justify-center grid-cols-2 mx-auto mt-10 mb-5 w-fit lg:grid-cols-4 md:grid-cols-2 justify-items-center gap-y-20 gap-x-14">
          {filteredProducts.map((product) => (
            <Product
              price={product.price}
              image={product.images[0]}
              key={product._id}
              id={product._id}
              name={product.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
