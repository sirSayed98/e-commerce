const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    return next(
      new ErrorResponse(`Product with id of ${req.params.id} not found `, 404)
    );
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    return next(
      new ErrorResponse(`Product with id of ${req.params.id} not found `, 404)
    );
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  const product = new Product({
    name: name || "some name",
    price: price || 0,
    user: req.user._id,
    image: image || "/images/sample.jpg",
    brand: brand || "brand",
    category: category || "cate",
    countInStock: countInStock || 0,
    numReviews: 0,
    description: description || "URL",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    return next(
      new ErrorResponse(`Product with id of ${req.params.id} not found `, 404)
    );
  }
});
