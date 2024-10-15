const express = require('express');
const { getUserPublicKey } = require('../controllers/userController');
const router = express.Router();

// Route to get public key by username or email
router.get('/:identifier', getUserPublicKey);

module.exports = router;
