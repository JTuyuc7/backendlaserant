//Model
const Dish = require('../models/Dish');
const { validationResult } = require('express-validator');

// Function errors
const getErrors = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
}

// Get all dishes
exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find().sort({ creado: -1});
        res.status(200);
        res.json({dishes})
    } catch (error) {
        res.status(500);
        res.json({msg: 'Unable to get the dishes'})
    }
};

// Get an especific dish for ID
exports.getDihs = async (req, res) => {
    
    try {
        const id = req.params.id;
        const dish = await Dish.findById({ _id: id });
        res.status(200);
        res.json({dish})
    } catch (error) {
        console.log(error);
        res.status(404);
        res.json({msg: `Dish with the id ${req.params.id} was not found`})
    }
}

exports.addNewDish = async (req, res) => {
    getErrors(req, res);
    // Add the dish to DB
    try {
        const dish = new Dish(req.body);
        dish.save();
        res.status(200);
        res.json({ msg: 'Added correctly', dish });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Unable to save the dish'});
    }
}

exports.editDish = async (req, res) => {

    getErrors(req, res);
    const { name, price, quantity, category, img, description } = req.body;
    try {
        // Get the id from the params
        const id = req.params.id;
        // Dish from DB
        let dishFound = await Dish.findById({ _id: id});
        if(!dishFound){
            res.status(404).json({ msg: 'Project was not founded'})
        }

        const dish = {};
        dish.name = name || dishFound.name;
        dish.price = price || dishFound.price;
        dish.quantity = quantity || dishFound.quantity;
        dish.category = category || dishFound.category;
        dish.img = img || dishFound.img;
        dish.description = description || dishFound.description;

        dishFound = await Dish.findByIdAndUpdate({ _id: id}, { $set: dish}, { new: true});
        res.json({dish})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, unable to update the dish'})
    }
}

// Delete a dish
exports.deleteDish = async (req, res) => {

    try {
        const dish = await Dish.findById({ _id: req.params.id });
        //console.log(dish, 'was not found')
        
        await Dish.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Deleted successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: `Project does not exist or Id is invalid`})
    }
}