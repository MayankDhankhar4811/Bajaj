const express = require('express');
const { bfhlPost, bfhlGet } = require('../controllers/bfhlController');

const router = express.Router();

// POST /bfhl - Main endpoint for processing data
router.post('/bfhl', bfhlPost);

// GET /bfhl - For operation code
router.get('/bfhl', bfhlGet);

module.exports = router;