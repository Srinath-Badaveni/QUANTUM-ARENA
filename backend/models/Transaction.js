const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  paidBy: { type: String, default: 'Treasury' },
  date: { type: Date, default: Date.now },
  splitDetails: { type: mongoose.Schema.Types.Mixed, default: {} }
});

module.exports = mongoose.model('Transaction', transactionSchema);
