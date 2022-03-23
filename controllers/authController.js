const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcruptjs = require('bcryptjs');

exports.authenticateUser = async (req, res, next) => {
    
    // Revisar que los datos se envien
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // extraer los datos del body
    const { email, password } = req.body;

    try {
        // Find the user on the DB
        let user = await User.findOne({ email })
        if( !user ){
            return res.status(400).json({ msg: 'User with that email does not exist'})
        }

        if( !user.authenticated ){
            return res.status(400).json({msg: 'Your account has not been verified'})
        }
        // Compare if the passwords are equal 
        const correctPass = await bcruptjs.compare(password, user.password )
        if(!correctPass){
            return res.status(400).json({ msg: 'Incorrect password'})
        }

        const payload = {
            user : {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }

        const userData = {};
        userData.firstName = user.firstName;
        userData.lastName = user.lastName;
        userData.email = user.email;
        userData.id = user._id
        // Firmar el token y dejar fecha de expiracion
        jwt.sign(payload, process.env.PALABRA_SECRETA, {
            expiresIn: 18000 // 1 hora
        }, (error, token) => {
            if(error) throw error;
            res.json({ token: token, msg: 'Logged in successfully', user: userData })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Server error, unable to authenticate the user'})
    }
}