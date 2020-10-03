const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product')
const ErrorResponse = require('../utils/errorResponse');


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({})

    res.json(products)
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public

exports.getSingleProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        return next(
            new ErrorResponse(`Product with id of ${req.params.id} not found `, 404)
        );
    }
});


