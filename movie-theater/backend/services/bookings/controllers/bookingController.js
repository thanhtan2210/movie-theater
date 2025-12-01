// Bookings Controller
const { asyncHandler } = require('../../shared/middleware/errorHandler');
const errorMessages = require('../../shared/constants/errorMessages');

// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  // Mock: Implement booking creation logic
  const newBooking = {
    id: Math.floor(Math.random() * 1000),
    ...req.body,
    status: 'Confirmed',
    bookingDate: new Date().toISOString(),
  };

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: newBooking
  });
});

// Get booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  // Mock: Implement database query
  const mockBookings = [
    { id: 101, userId: 1, movieId: 1, showtime: '2024-12-01T18:00:00Z', seats: ['A1', 'A2'], totalPrice: 200000, status: 'Confirmed' },
    { id: 102, userId: 1, movieId: 2, showtime: '2024-12-02T20:00:00Z', seats: ['B5'], totalPrice: 100000, status: 'Pending' }
  ];
  const { id } = req.params;
  const booking = mockBookings.find(b => b.id === parseInt(id));

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: errorMessages.NOT_FOUND
    });
  }

  res.json({
    success: true,
    message: 'Booking retrieved successfully',
    data: booking
  });
});

// Get bookings for a user
const getUserBookings = asyncHandler(async (req, res) => {
  // Mock: Implement database query
  const mockBookings = [
    { id: 101, userId: 1, movieId: 1, showtime: '2024-12-01T18:00:00Z', seats: ['A1', 'A2'], totalPrice: 200000, status: 'Confirmed' },
    { id: 102, userId: 1, movieId: 2, showtime: '2024-12-02T20:00:00Z', seats: ['B5'], totalPrice: 100000, status: 'Pending' }
  ];
  const { userId } = req.params;
  const userBookings = mockBookings.filter(b => b.userId === parseInt(userId));

  res.json({
    success: true,
    message: 'User bookings retrieved successfully',
    data: userBookings
  });
  });

module.exports = {
  createBooking,
  getBookingById,
  getUserBookings
};
