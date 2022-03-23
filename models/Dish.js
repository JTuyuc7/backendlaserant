const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Dish', DishSchema);