const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getAllRestaurantsController, getRestauantBYIdController, deleteRestaurantController } = require('../controllers/restaurantController');

const router = express.Router();

//routes
//CREATE RESTAURANT || POST
router.post('/createRestaurant', authMiddleware, createRestaurantController)

//GET ALL RESTAURANTS || GET
router.get('/getAllRestaurants', getAllRestaurantsController);

//GET RESTAURANT BY ID || GET
router.get('/getRestaurant/:id', getRestauantBYIdController);

//DELETE RESTAURANT || DELETE
router.delete('/deleteRestaurant/:id', authMiddleware, deleteRestaurantController)

module.exports = router;