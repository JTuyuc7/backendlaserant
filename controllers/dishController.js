//Model
const Dish = require('../models/Dish');
const { validationResult } = require('express-validator');

const getErrors = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
}

exports.getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.find({ creator: req.user.id}).sort({ creado: -1});
        //const dishes = await Dish.find().where('creator').equals(req.user.id);
        res.status(200);
        res.json({dishes})
    } catch (error) {
        res.status(500);
        res.json({msg: 'Unable to get the dishes'})
    }
};

exports.getDish = async (req, res) => {
    const userId = req.user.id;
    try {
        const id = req.params.id;
        const dish = await Dish.findById({ _id: id });

        if( dish.creator.toString() !== userId.toString()){
            return res.status(401).json({ msg: 'insufficient permissions'})
        }
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

    try {
        const dish = new Dish(req.body);
        dish.creator = req.user.id;
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
    const userId = req.user.id;
    
    try {
        const id = req.params.id;
        let dishFound = await Dish.findById({ _id: id});
        if(!dishFound){
            return res.status(404).json({ msg: 'Project was not founded'})
        }
    
        if( dishFound.creator.toString() !== userId.toString() ){
            return res.status(404).json({ msg: 'Insufficient permissions to make this action'})
        }

        const dish = {};
        dish.name = name || dishFound.name;
        dish.price = price || dishFound.price;
        dish.quantity = quantity || dishFound.quantity;
        dish.category = category || dishFound.category;
        dish.img = img || dishFound.img;
        dish.description = description || dishFound.description;
        dish.creator = dishFound.creator;
        dishFound = await Dish.findByIdAndUpdate({ _id: id}, { $set: dish}, { new: true});
        res.status(200);
        res.json({dish});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error, unable to update the dish'})
    }
}

exports.deleteDish = async (req, res) => {

    const userId = req.user.id;
    try {
        const dish = await Dish.findById({ _id: req.params.id });
        if(!dish){
            return res.status(404).json({ msg: 'Dish was not founded'})
        }

        if( dish.creator.toString() !== userId.toString()){
            return res.status(401).json({  msg: 'Insufficient permissions to make this action' })
        }
        await Dish.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Deleted successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: `Project does not exist or Id is invalid`})
    }
}