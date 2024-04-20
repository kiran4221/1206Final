const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Function to get all expenses
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        return res.status(200).json({
            message: 'Successfully found all expenses!',
            data: expenses
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching expenses!',
            error: error
        });
    }
};

// Function to create a new expense
const createExpense = async (req, res) => {
    const allHeaders = req.headers;

    // Check if authorization token is provided
    if (!allHeaders.authorization) {
        return res.status(401).json({
            message: "Please provide the token"
        });
    }
    const token = allHeaders.authorization;

    // Decode the token to extract user ID
    const decodedToken = jwt.decode(token, { complete: true });
    const userId = decodedToken.payload.id;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(401).json({
            message: 'You are not authorized to create an expense!'
        });
    }

    // Create a new expense
    const expenseBody = req.body;
    const newExpense = new Expense({
        user: userId,
        amount: expenseBody.amount,
        description: expenseBody.description,
        date: expenseBody.date
    });

    // Save the new expense to the database
    try {
        const savedExpense = await newExpense.save();
        return res.status(201).json({
            message: "Expense created successfully!",
            data: savedExpense
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating expense!',
            error: error
        });
    }
};

// Function to delete an expense
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({
                message: 'Expense not found!'
            });
        }
        return res.json({
            message: 'Expense deleted successfully!',
            data: deletedExpense
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting expense!',
            error: error
        });
    }
};

module.exports = {
    getAllExpenses,
    createExpense,
    deleteExpense
};
