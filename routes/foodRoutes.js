const express = require ('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodItemController, deleteFoodItemController, placeOrderController, orderStatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

//routes
//CREATE FOOD
router.post('/createFood', authMiddleware, createFoodController);

//GET ALL FOODS
router.get('/getAllFoods', getAllFoodsController)

//GET SINGLE FOOD
router.get('/getFood/:id', getSingleFoodController)

//GET FOOD BY RESTAURANT
router.get('/getFoodByRestaurant/:id', getFoodByRestaurantController)

//UPDATE FOOD BY ID
router.put('/updateFoodItem/:id', authMiddleware, updateFoodItemController)

//DELETE FOOD BY ID
router.delete('/deleteFoodItem/:id', authMiddleware, deleteFoodItemController)

//PLACE ORDER
router.post('/placeOrder', authMiddleware, placeOrderController);

//ORDER STATUS
router.post('/orderStatus/:id',authMiddleware, adminMiddleware, orderStatusController)

module.exports = router;