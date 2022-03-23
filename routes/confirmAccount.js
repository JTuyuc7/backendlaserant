const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const confirmController = require('../controllers/confirmController');

router.get('/:token', 
    confirmController.confirmAccount
);

module.exports = router;