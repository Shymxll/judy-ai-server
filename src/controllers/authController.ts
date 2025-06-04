import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/userModel';
import logger from '../utils/logger';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import appConfig from '../config';


const createToken = (user: IUser) => {
    const payload = { id: user._id, email: user.email, name: user.name, surname: user.surname };
    const secret: Secret = appConfig.jwt.secret;
    const options: SignOptions = { expiresIn: appConfig.jwt.expiresIn as any };
    return jwt.sign(payload, secret, options);
};

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, surname, email, password } = req.body;
        if (!name || !surname || !email || !password) {
            res.status(400).json({ success: false, message: 'All fields are required.' });
            return;
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ success: false, message: 'Email already in use.' });
            return;
        }
        const user = new User({ name, surname, email, password });
        await user.save();
        const token = createToken(user);
        res.cookie(appConfig.jwt.cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({
            success: true,
            user: { id: user._id, name: user.name, surname: user.surname, email: user.email }
        });
    } catch (error) {
        logger.error('Register error', error);
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required.' });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid credentials.' });
            return;
        }
        const token = createToken(user);
        res.cookie(appConfig.jwt.cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            success: true,
            user: { id: user._id, name: user.name, surname: user.surname, email: user.email }
        });
    } catch (error) {
        logger.error('Login error', error);
        next(error);
    }
};

const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie(appConfig.jwt.cookieName, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
};


export default { register, login, logout };
