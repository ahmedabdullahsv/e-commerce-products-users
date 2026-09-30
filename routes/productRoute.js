const { Product } = require("../model/productModel");
const { Category } = require("../model/categoryModel");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// creat product
router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  product = await product.save();
  if (!product) return res.status(500).send("the product cannot be created");
  res.send(product);
});

// get list of product
router.get("/", async (req, res) => {
  const productList = await Product.find().select("name");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

// get specific product
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

// Update Product
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  const prodcut = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true },
  );
  if (!prodcut) {
    return res.status(500).send("the produvt cannot updated");
  }
  res.send(prodcut);
});

//delete prodcut

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((prodcut) => {
      if (prodcut) {
        return res
          .status(200)
          .json({ success: true, message: "the prodcut is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "prodcut id not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});
module.exports = router;
