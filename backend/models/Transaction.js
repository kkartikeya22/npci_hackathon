const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderPublicKey: { type: String, required: true },
  receiverPublicKey: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
