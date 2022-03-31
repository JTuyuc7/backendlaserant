const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const genereateId = require('../helpers/GenerateId');
const sendConfirmation = require('../helpers/sendGridConfirmation');

exports.createUser = async (req, res ) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ msg: 'Please choose a different email'});
        }
        user = new User(req.body);
        user.token = genereateId();
        
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        
        await user.save();

        sendConfirmation({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token
        })

        const payload = {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }

        jwt.sign( payload, process.env.PALABRA_SECRETA, {
            expiresIn: 3600 
        }, (error, token) => {
            if(error) throw error;
            res.json({msg: 'Account created correctly'})
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, unable to create the user'})
    }
}