const User = require('../models/User');

exports.confirmAccount = async (req, res) => {

    const token = req.params.token;
    try {
        let user = await User.findOne({token: token});
        if(!user){
            return res.status(404).json({msg: 'Invalid token provided'})
        }

        // Usuario encotrado por token cambiar el estado de autenticado a true
        user.authenticated = true;
        user.token = '';

        await user.save();
        res.json({ msg: 'Account confirmed'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, try again later'})
    }
    
}