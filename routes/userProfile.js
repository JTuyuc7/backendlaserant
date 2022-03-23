const express = require('express');
const router = express.Router();
const usersProfile = require('../controllers/profileController');

router.get('/',
    usersProfile.userProfile
);

module.exports = router;