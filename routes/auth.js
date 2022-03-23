const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/authController');

// Iniciar sesion con el nuevo usuario
router.post('/',
    [
        check('email', 'Email is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty()
    ],
    userController.authenticateUser
);

module.exports = router;