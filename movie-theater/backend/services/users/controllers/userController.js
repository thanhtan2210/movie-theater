// Users Controller
const { asyncHandler } = require('../../shared/middleware/errorHandler');
const errorMessages = require('../../shared/constants/errorMessages');
const { isValidEmail, isValidPassword } = require('../../shared/utils/validators');

// User registration
const register = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;
  
  if (!email || !password || !fullName) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: errorMessages.INVALID_EMAIL
    });
  }
  
  if (!isValidPassword(password)) {
    return res.status(400).json({
      success: false,
      message: errorMessages.INVALID_PASSWORD
    });
  }
  
  // Mock: Check if user exists
  const mockUsers = [{ email: 'test@example.com', fullName: 'Test User' }]; // In a real app, this would be a DB query
  if (mockUsers.some(user => user.email === email)) {
    return res.status(409).json({
      success: false,
      message: errorMessages.ALREADY_EXISTS
    });
  }

  // Mock: Hash password and save to database
  const hashedPassword = "mockHashedPassword"; // In a real app, use bcrypt
  const newUser = { id: Math.floor(Math.random() * 1000), email, fullName };
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: newUser
  });
});

// User login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }
  
  // Mock: Find user and verify password
  const mockUser = { id: 1, email: 'test@example.com', password: 'password123', fullName: 'Test User' }; // In a real app, retrieve from DB and compare hashed password

  if (email !== mockUser.email || password !== mockUser.password) {
    return res.status(401).json({
      success: false,
      message: errorMessages.INVALID_CREDENTIALS
    });
  }
  
  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token: 'mock_jwt_token_here_12345',
      refreshToken: 'mock_refresh_token_here_67890'
    }
  });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }
  
  // Mock: Fetch user from database
  const mockUser = { id: parseInt(id), email: 'test@example.com', fullName: 'Test User', phone: '1234567890' }; // In a real app, query DB

  if (parseInt(id) !== mockUser.id) { // Simulate user not found
    return res.status(404).json({
      success: false,
      message: errorMessages.NOT_FOUND
    });
  }
  
  res.json({
    success: true,
    message: 'User profile retrieved successfully',
    data: mockUser
  });
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }
  
  // Mock: Update user in database
  const updatedUser = { id: parseInt(id), ...req.body }; // Simulate update
  
  res.json({
    success: true,
    message: 'User profile updated successfully',
    data: updatedUser
  });
});

// Delete user account
const deleteUserAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({
      success: false,
      message: errorMessages.REQUIRED_FIELD
    });
  }
  
  // Mock: Delete user from database
  
  res.json({
    success: true,
    message: `User account with ID ${id} deleted successfully`
  });
});

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
};
