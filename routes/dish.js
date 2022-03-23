const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const dishController = require('../controllers/dishController');
const checkAuth = require('../middleware/checkAuth');

// Get all the projects
router.get("/",
    checkAuth,
    dishController.getAllDishes
);

// Get an especific dish
router.get('/:id',
    checkAuth,
    dishController.getDish
);

// Add new Dish
router.post('/',
    checkAuth,
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
    checkAuth,
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
    checkAuth,
    dishController.deleteDish
);

//Clitus show

module.exports = router;