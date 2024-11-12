const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// CREATE FOOD
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if(!title || !description || !price || !restaurant){
        return res.status(500).send({
            success : false,
            message : "Please Provide all Fields"
        })
    }

    const newFood = foodModel({
        title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });

    await newFood.save();
    res.status(201).send({
        success : true,
        message : "New Food Item Added",
        newFood
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      error,
    });
  }
};

// GET ALL FOODS
const getAllFoodsController = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success : false,
                message : "No Food Items was Found"
            })
        }

        res.status(200).send({
            success : true,
            totalFoods : foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in GEt All Food API",
            error
        })
    }
}

//GET SINGLE FOOD
const getSingleFoodController = async (req, res) => {
    try {
        const foodID = req.params.id;
        if(!foodID){
            return res.status(404).send({
                success : false,
                message : "Please provide id"
            })
        }
        const food = await foodModel.findById(foodID);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food Found with this id"
            })
        }
        res.status(200).send({
            success : true,
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in get Single Food API",
            error
        })
    }
}

// GET FOOD BY RESTAURANT
const getFoodByRestaurantController = async (req, res) => {
    try {
        const restaurantID = req.params.id;
        if(!restaurantID){
            return res.status(404).send({
                success : false,
                message : "Please provide restaurant id"
            })
        }
        const food = await foodModel.find({restaurant : restaurantID});
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food Found With This Restaurant Id"
            })
        }

        res.status(200).send({
            success : true,
            message : "food based on restaurant",
            food
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "",
            error
        })
    }
}

//UPDATE FOOD ITEM
const updateFoodItemController = async (req, res) => {
    try {
        const foodID = req.params.id;
        if(!foodID){
            return res.status(404).send({
                success : false,
                message : "No Food ID  was Found"
            })
        }
        const food = await foodModel.findById(foodID);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food Found"
            })
        }
        const {title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        } = req.body

        const updatedFood = await foodModel.findByIdAndUpdate(foodID, {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        }, {new : true})

        res.status(200).send({
            success : true,
            message : "Food Item was Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error In Update Food API',
            error
        })
    }
}

//DELETE FOOD ITEM
const deleteFoodItemController = async(req, res) => {
    try {
        const foodID = req.params.id;
        if(!foodID){
            return res.status(404).send({
                success : false,
                message : "Please Provide Food ID"
            })
        }

        const food = await foodModel.findById(foodID);
        if(!food){
            return res.status(404).send({
                success : false,
                message : "No Food Found With ID"
            })
        }
        await foodModel.findByIdAndDelete(foodID);
        res.status(200).send({
            success : true,
            message : "Food Item Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Fodd Delete API",
            error
        })
    }
}

//PLACE ORDER
const placeOrderController = async(req, res) => {
    try {
        const {cart, payment} = req.body;
        if(!cart){
            return res.status(500).send({
                success : false,
                message : "Please Add Food To the Cart"
            })
        }

        let total = 0;
        cart.map((i) => {
            total += i.price;
        })

        const newOrder = new orderModel({
            foods : cart,
            payment : total,
            buyer : req.body.id
        })

        await newOrder.save();

        res.status(200).send({
            success : true,
            message : "Order Placed Successfully",
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Place Order API",
            error
        })
    }
}

//CHANGFE ORDER STATUS
const orderStatusController = async (req, res) => {
    try {
        const orderID = req.params.id;
        if(!orderID){
            return res.status(404).send({
                success : false,
                message : "Please Provide Valid Order Id"
            })
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderID, {status}, {new : true})
        res.status(200).send({
            success : true,
            message : "Order Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error In Order Status API",
            error
        })
        
    }
}

module.exports = { createFoodController, getAllFoodsController, getSingleFoodController, getFoodByRestaurantController, updateFoodItemController, deleteFoodItemController, placeOrderController, orderStatusController };
