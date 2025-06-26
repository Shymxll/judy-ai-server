/**
 * API Routes
 */
import express, { Request, Response, Router } from 'express';
import usersRoutes from './users';
import authRoutes from './auth';
import analyzeRoutes from './analyze';
const router: Router = express.Router();


// Mount resource routes
router.use('/user', usersRoutes);
router.use('/auth', authRoutes);
router.use('/analyze', analyzeRoutes);

export default router;

