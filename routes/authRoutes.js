// authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');
const { loginUser } = require('./userService');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Login failed:', error);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
