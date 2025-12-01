// Bookings Routes
import express from 'express';
import { createBooking, getBookingById, getUserBookings } from '../controllers/bookingController.js';
import authMiddleware from '../../../shared/middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, createBooking);
router.get('/:id', authMiddleware, getBookingById);
router.get('/user/:userId', authMiddleware, getUserBookings);

export default router;
