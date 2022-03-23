const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
        trim: true,
    },
    authenticated:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UsersSchema);