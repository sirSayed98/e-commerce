const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userID } = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (userID.toString() !== req.user._id.toString()) {
    res.status(400);
    res.send(`User of id ${userID} not submitted that review `);
    return;
  }
  if (!user) {
    res.status(404);
    res.send(`User with id of ${req.user._id} not found `);
    return;
  }

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      res.send(`Product with id of ${req.params.id} already reviewed `);
      return;
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    res.send(`Product with id of ${req.params.id} not found `);
    return;
  }
});
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
exports.getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
