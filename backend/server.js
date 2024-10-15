const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function

const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const publicKeyRoutes = require('./routes/publicKeyRoutes'); // Import public key routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/public-key', publicKeyRoutes); // Mount public key routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
