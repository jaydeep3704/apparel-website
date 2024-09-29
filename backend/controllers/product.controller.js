import { json } from "express";
import productModel from "../models/product.models.js";
import { v2 as cloudinary } from "cloudinary";
// add product

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
  
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
   
    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const newProduct = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
   
      bestSeller: bestSeller == "true" ? true : false,
      sizes:JSON.parse(sizes),
      images:imagesURL
    });

    newProduct.save()
    res.json({success:true,message:"Product Added Successfully"});
  } catch (error) {
    console.log("add Product ", error);
    res.json({ success: false, message: error.meesage });
  }
};

const listProducts = async (req, res) => {
    try {
        const products=await productModel.find({})
        res.json({success:true,products})
    } catch (error) {
        console.log("list Products ",error)
        res.json({success:false,error:error.message})
    }
};

const removeProduct = async (req, res) => {
  try {
    

      const product = await productModel.findByIdAndDelete(req.body.id);

      if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
      }

      res.json({ success: true, message: "Product deleted Successfully" });
  } catch (error) {
      console.log("remove product: ", error);
      res.status(500).json({ success: false, error: error.message });
  }
};


const singleProduct = async (req, res) => {
  try {
      const productId=req.body.id
      const product=await productModel.findById(productId)
      res.json({success:true,message:'product fetched sucessfully',product})
  } catch (error) {
    console.log('Single Product',error)
    res.json({success:false,error:error.message})
  }
};



export { addProduct, listProducts, removeProduct, singleProduct };
