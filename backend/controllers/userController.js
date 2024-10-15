const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

// Register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Generate public-private key pair
  const publicKey = crypto.AES.encrypt(username, 'secret_key').toString();  // Simplified for demo

  const newUser = new User({
    username,
    password: hashedPassword,
    publicKey,
    encryptedBalance: crypto.AES.encrypt('1000', 'secret_key').toString(),  // Initial balance
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// User login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token, publicKey: user.publicKey });
};

// Method to get user public key by username or email
const getUserPublicKey = async (req, res) => {
    const { identifier } = req.params;
  
    try {
      // Find user by username or email
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Respond with the public key
      return res.json({ publicKey: user.publicKey });
    } catch (error) {
      console.error('Error fetching public key:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = { registerUser, loginUser,getUserPublicKey };
