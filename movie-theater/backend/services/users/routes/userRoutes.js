// Users Routes
const express = require('express');
const authMiddleware = require('../../../shared/middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/:id', authMiddleware, userController.getUserProfile);
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.delete('/:id', authMiddleware, userController.deleteUserAccount);

module.exports = router;
