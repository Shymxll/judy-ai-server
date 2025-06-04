/**
 * Case controller - handles case-related business logic
 */
const Case = require('../models/caseModel');

/**
 * Get all cases
 * @route GET /api/cases
 * @access Public
 */
const getAllCases = async (req, res, next) => {
  try {
    const cases = await Case.find();
    
    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get case by ID
 * @route GET /api/cases/:id
 * @access Public
 */
const getCaseById = async (req, res, next) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    
    if (!caseItem) {
      const error = new Error('Case not found');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({
      success: true,
      data: caseItem
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      const formattedError = new Error('Case not found with the specified ID');
      formattedError.statusCode = 404;
      return next(formattedError);
    }
    next(error);
  }
};

/**
 * Create new case
 * @route POST /api/cases
 * @access Public
 */
const createCase = async (req, res, next) => {
  try {
    const newCase = await Case.create(req.body);
    
    res.status(201).json({
      success: true,
      data: newCase
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      const formattedError = new Error(messages.join(', '));
      formattedError.statusCode = 400;
      return next(formattedError);
    }
    
    // Handle duplicate key errors (e.g., unique case number)
    if (error.code === 11000) {
      const formattedError = new Error('Case with this case number already exists');
      formattedError.statusCode = 400;
      return next(formattedError);
    }
    
    next(error);
  }
};

/**
 * Update case
 * @route PUT /api/cases/:id
 * @access Public
 */
const updateCase = async (req, res, next) => {
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!updatedCase) {
      const error = new Error('Case not found');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({
      success: true,
      data: updatedCase
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      const formattedError = new Error(messages.join(', '));
      formattedError.statusCode = 400;
      return next(formattedError);
    }
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      const formattedError = new Error('Case not found with the specified ID');
      formattedError.statusCode = 404;
      return next(formattedError);
    }
    
    next(error);
  }
};

/**
 * Delete case
 * @route DELETE /api/cases/:id
 * @access Public
 */
const deleteCase = async (req, res, next) => {
  try {
    const caseToDelete = await Case.findByIdAndDelete(req.params.id);
    
    if (!caseToDelete) {
      const error = new Error('Case not found');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({
      success: true,
      data: caseToDelete
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      const formattedError = new Error('Case not found with the specified ID');
      formattedError.statusCode = 404;
      return next(formattedError);
    }
    
    next(error);
  }
};

module.exports = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase
};