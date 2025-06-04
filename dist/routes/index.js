"use strict";
/**
 * API Routes
 */
const express = require('express');
const usersRoutes = require('./users');
const productsRoutes = require('./products');
const router = express.Router();
// Health check route
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// Mount resource routes
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
module.exports = router;
