const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Create Users
router.post('/', 
    [
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Password needs to be at least 6 characters').isLength({min: 6})
    ],
    userController.createUser
);

module.exports = router;