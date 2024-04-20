const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

const JWT_SECRET = generateRandomString(32); // Generate a 32-character random string
console.log('JWT Secret:', JWT_SECRET);
