const Transaction = require('../models/Transaction');
const User = require('../models/User');
const crypto = require('crypto-js');

// Create a new transaction
const createTransaction = async (req, res) => {
  const { senderPublicKey, receiverPublicKey, amount } = req.body;

  const sender = await User.findOne({ publicKey: senderPublicKey });
  const receiver = await User.findOne({ publicKey: receiverPublicKey });

  if (!sender || !receiver) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Decrypt sender's balance
  const decryptedBalance = crypto.AES.decrypt(sender.encryptedBalance, 'secret_key').toString(crypto.enc.Utf8);
  
  // Check if the sender has enough balance
  if (Number(decryptedBalance) < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  // Update balances
  const updatedSenderBalance = Number(decryptedBalance) - amount;
  const updatedReceiverBalance = Number(crypto.AES.decrypt(receiver.encryptedBalance, 'secret_key').toString(crypto.enc.Utf8)) + amount;

  // Encrypt updated balances
  sender.encryptedBalance = crypto.AES.encrypt(updatedSenderBalance.toString(), 'secret_key').toString();
  receiver.encryptedBalance = crypto.AES.encrypt(updatedReceiverBalance.toString(), 'secret_key').toString();

  // Save users and transaction
  await sender.save();
  await receiver.save();

  const transaction = new Transaction({ senderPublicKey, receiverPublicKey, amount });
  await transaction.save();

  res.json({ message: 'Transaction successful' });
};

module.exports = { createTransaction };
