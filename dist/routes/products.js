"use strict";
/**
 * Product routes
 */
const express = require('express');
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const router = express.Router();
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateProduct, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
module.exports = router;
