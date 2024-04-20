const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/Expense');

// Expense Create API
router.post('/', ExpenseController.createExpense);

// Get All Expenses API
router.get('/', ExpenseController.getAllExpenses);

// Delete Expense API
router.delete('/:id', ExpenseController.deleteExpense);

module.exports = router;
