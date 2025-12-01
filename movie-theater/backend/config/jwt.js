// JWT configuration
module.exports = {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};
