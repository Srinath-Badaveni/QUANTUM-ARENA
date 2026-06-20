const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true },
  date: { type: Date, default: Date.now },
  splitDetails: {
    event: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    prizes: { type: Number, default: 0 },
    logistics: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
