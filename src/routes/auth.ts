import express, { Router } from 'express';
import authController from '../controllers/authController';

const router: Router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);


export default router; 