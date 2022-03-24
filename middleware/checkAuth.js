const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAuth = async (req, res, next) => {
    
    let token;
    // validar que exista un token en los headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1];

            //const decoded = jwt.decode(token);
            const decoded = jwt.verify(token, process.env.PALABRA_SECRETA);
            let id = decoded.user.id;
            req.user = await User.findById({_id: id}).select('-password -authenticated -token -__v -created')
            
            return next();
        } catch (error) {
            console.log(error)
            return res.status(404).json({msg: 'Please log in again'})
        }
    }

    if(!token){
        return res.status(401).json({ msg: 'Invalid token'})
    }

    next();
}

module.exports = checkAuth;