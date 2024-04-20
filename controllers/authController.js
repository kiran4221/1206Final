const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const userBody = req.body;

    if (!userBody.email || !userBody.password || !userBody.name) {
        return res.status(400).json({
            message: 'Email, password, or name missing!'
        });
    }

    try {
        const userExists = await User.findOne({ email: userBody.email });

        if (userExists) {
            return res.status(403).json({
                message: "User already exists, use a different email!"
            });
        }

        const encryptedPassword = await bcrypt.hash(userBody.password, 10);

        const newUser = new User({
            name: userBody.name,
            email: userBody.email,
            password: encryptedPassword
        });

        const savedUser = await newUser.save();
        return res.status(201).json({
            message: 'User registered successfully!',
            data: savedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'There was an error',
            error: error
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: 'Successfully found the users!',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching users!',
            error: error
        });
    }
};

const loginUser = async (req, res) => {
    const userBody = req.body;

    if (!userBody.email || !userBody.password) {
        return res.status(400).json({
            message: 'Email or password missing!'
        });
    }

    try {
        const userExists = await User.findOne({ email: userBody.email });

        if (!userExists) {
            return res.status(401).json({
                message: "User doesn't exist"
            });
        }

        const isPasswordValid = await bcrypt.compare(userBody.password, userExists.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect credentials"
            });
        }

        const accessToken = jwt.sign({
            email: userExists.email,
            name: userExists.name,
            id: userExists._id
        }, process.env.JWT_SECRET_KEY);

        const userData = {
            id: userExists._id,
            email: userExists.email,
            name: userExists.name,
            token: accessToken
        };

        return res.status(200).json({
            message: "User logged in!",
            data: userData
        });
    } catch (error) {
        return res.status(500).json({
            message: 'There was an error',
            error: error
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    registerUser,
    getUsers,
    loginUser,
    getUserById
};
