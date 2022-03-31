const User = require('../models/User');
const { validationResult } = require('express-validator');
const genereateId = require('../helpers/GenerateId');
const bcryptjs = require('bcryptjs');
const resetPasswordGrid = require('../helpers/resetSengridPass');

exports.forgotPssword = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({msg: 'Incorrect information'})
        }

        user.token = genereateId()
        await user.save();
        resetPasswordGrid({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token
        })

        res.json({msg: 'Please check your email to reset the password'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, try again later'})
    }

}

exports.resetPassword = async (req, res) => {
    const token = req.params.token;

    try {
        let user = await User.findOne({token});

        if(!user){
            return res.status(404).json({msg: 'Invalid token or invalid user'})
        }

        res.json({ msg: 'Great please set a new password'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, try again later'})
    }
    
}

exports.changePassword = async (req,res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const token = req.params.token;
    const { password } = req.body;
    try {
        let user = await User.findOne({token})
        if(!user){
            return res.status(400).json({ msg: 'User not founded or invalid token'})
        }

        const hashPassword = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, hashPassword);
        user.token = '';
        await user.save();
        res.json({msg: 'Password changed correctly'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, try again later'})
    }
}