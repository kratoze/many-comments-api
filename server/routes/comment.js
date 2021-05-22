const express = require('express');
const router = express.Router();

const userService = require('../services/user.services');
const authMiddleware = require('../middleware/requireAuth');

router.post('/', (req, res) => {});

module.exports = router;
