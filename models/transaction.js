const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Transaction = db.model('Transaction', {
  date: {
    type: Date,
    default: Date.now
  },
  amount: Number,
  isExpense: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: "opcionális"
  },
  comment: String
});

module.exports = Transaction;