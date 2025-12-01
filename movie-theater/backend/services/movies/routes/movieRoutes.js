// Movies Routes
const express = require('express');
const authMiddleware = require('../../../shared/middleware/authMiddleware');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Public routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// Protected routes (Admin only)
router.post('/', authMiddleware, movieController.createMovie);
router.put('/:id', authMiddleware, movieController.updateMovie);
router.delete('/:id', authMiddleware, movieController.deleteMovie);

module.exports = router;
