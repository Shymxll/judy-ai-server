"use strict";
/**
 * Product controller - handles product-related business logic
 */
const products = [
    { id: '1', name: 'Laptop', price: 1200, category: 'Electronics' },
    { id: '2', name: 'Smartphone', price: 800, category: 'Electronics' }
];
/**
 * Get all products
 */
const getAllProducts = (req, res) => {
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
};
/**
 * Get product by ID
 */
const getProductById = (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        data: product
    });
};
/**
 * Create new product
 */
const createProduct = (req, res) => {
    const newProduct = {
        id: Date.now().toString(),
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json({
        success: true,
        data: newProduct
    });
};
/**
 * Update product
 */
const updateProduct = (req, res, next) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        return next(error);
    }
    products[index] = {
        ...products[index],
        ...req.body
    };
    res.status(200).json({
        success: true,
        data: products[index]
    });
};
/**
 * Delete product
 */
const deleteProduct = (req, res, next) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        const error = new Error('Product not found');
        error.statusCode = 404;
        return next(error);
    }
    const deletedProduct = products[index];
    products.splice(index, 1);
    res.status(200).json({
        success: true,
        data: deletedProduct
    });
};
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
