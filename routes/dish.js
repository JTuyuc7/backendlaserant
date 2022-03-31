const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const dishController = require('../controllers/dishController');
const checkAuth = require('../middleware/checkAuth');

router.get("/",
    checkAuth,
    dishController.getAllDishes
);

router.get('/:id',
    checkAuth,
    dishController.getDish
);

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

router.delete('/:id', 
    checkAuth,
    dishController.deleteDish
);

module.exports = router;