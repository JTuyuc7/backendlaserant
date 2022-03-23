const User = require('../models/User');

exports.userProfile = async (req, res) => {
    
    const userId = req.user.id;
    try {
        let user = await User.findById({_id: userId});

        if(!user){
            return res.status(404).json({ msg: 'Seems we are having issues loading your credentials'})
        }
        
        const objUser = {};
        objUser.firstName = user.firstName;
        objUser.lastName = user.lastName;
        objUser.email = user.email;
        objUser.id = user._id;
        objUser.created = user.created;

        res.json({ user: objUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Unable to load users profile'})
    }
}