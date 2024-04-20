const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpenseUser",
    required: true,
  }
}, {
    timestamps: true
});


const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;
