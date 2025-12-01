// Error messages constants
module.exports = {
    // Auth errors
    INVALID_CREDENTIALS: 'Invalid email or password',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    UNAUTHORIZED: 'Unauthorized access',

    // Validation errors
    INVALID_EMAIL: 'Invalid email format',
    INVALID_PASSWORD: 'Password must be at least 6 characters',
    INVALID_PHONE: 'Invalid phone number',
    REQUIRED_FIELD: 'This field is required',

    // Resource errors
    NOT_FOUND: 'Resource not found',
    ALREADY_EXISTS: 'Resource already exists',

    // Server errors
    INTERNAL_SERVER_ERROR: 'Internal server error'
};
