"use strict";
/**
 * User controller - handles user-related business logic
 */
const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
];
/**
 * Get all users
 */
const getAllUsers = (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
};
/**
 * Get user by ID
 */
const getUserById = (req, res, next) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
    }
    res.status(200).json({
        success: true,
        data: user
    });
};
/**
 * Create new user
 */
const createUser = (req, res) => {
    const newUser = {
        id: Date.now().toString(),
        ...req.body
    };
    users.push(newUser);
    res.status(201).json({
        success: true,
        data: newUser
    });
};
/**
 * Update user
 */
const updateUser = (req, res, next) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
    }
    users[index] = {
        ...users[index],
        ...req.body
    };
    res.status(200).json({
        success: true,
        data: users[index]
    });
};
/**
 * Delete user
 */
const deleteUser = (req, res, next) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return next(error);
    }
    const deletedUser = users[index];
    users.splice(index, 1);
    res.status(200).json({
        success: true,
        data: deletedUser
    });
};
module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
