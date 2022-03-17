const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const dishController = require('../controllers/dishController');

// Get all the projects
router.get("/",
    dishController.getAllDishes
);

// Get an especific dish
router.get('/:id',
    dishController.getDihs
);

// Add new Dish
router.post('/', 
    [
        check('name', 'Name is required to add a dish').not().isEmpty(),
        check('price', 'Please add a valid price').isNumeric(),
        check('quantity', 'Please add a quantity').isNumeric(),
        check('category', 'Please select a category').not().isEmpty(),
        check('img', 'Image is required').not().isEmpty(),
        check('description', 'Please add a description').not().isEmpty()
    ],
    dishController.addNewDish
);

// Update a dish
router.put('/:id',
    [
        check('name', 'Name is required to add a dish').not().isEmpty(),
        check('price', 'Please add a valid price').isNumeric(),
        check('quantity', 'Please add a quantity').isNumeric(),
        check('category', 'Please select a category').not().isEmpty(),
        check('img', 'Image is required').not().isEmpty(),
        check('description', 'Please add a description').not().isEmpty()
    ],
    dishController.editDish
);

// Delete a Dish
router.delete('/:id', 
    dishController.deleteDish
);

//Clitus show

module.exports = router;