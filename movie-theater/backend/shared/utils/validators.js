// Email validator
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Phone validator
const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

// Password validator
const isValidPassword = (password) => {
    return password && password.length >= 6;
};

module.exports = {
    isValidEmail,
    isValidPhone,
    isValidPassword
};
