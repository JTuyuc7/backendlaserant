const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const { check } = require('express-validator');

router.post('/',
    [
        check('email', 'Email is required to reset the password').not().isEmpty(),
    ],
    passwordController.forgotPssword
);

router.get('/:token',
    passwordController.resetPassword
);

router.post('/:token',
    [
        check('password', 'Please enter a valid password').isLength({min: 6})
    ],
    passwordController.changePassword
)

module.exports = router;