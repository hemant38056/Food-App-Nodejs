const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryController');

const router = express.Router();

//routes
//CREATE CATEGORY
router.post('/createCategory', authMiddleware, createCategoryController);

//GET ALL CATEGORY
router.get('/getAllCategory', getAllCategoryController);

//UPDATE CATEGORY BY ID
router.put('/updateCategory/:id', authMiddleware, updateCategoryController);

//DELETE CATEGORY BY ID
router.delete('/deleteCategory/:id', authMiddleware, deleteCategoryController);

module.exports = router;