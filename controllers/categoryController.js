const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCategoryController = async (req, res) => {
    try {
        const {title, imageUrl} = req.body;
        //validation
        if(!title){
            return res.status(500).send({
                success : false,
                message : 'Please Provide Category Title'
            })
        }
        const newCategory = new categoryModel({title, imageUrl});
        await newCategory.save();
        res.status(201).send({
            success : true,
            message : "Category Created",
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error In Create Category API",
            error
        })
    }
}

//GET ALL CATEGORY
const getAllCategoryController = async(req, res) => {
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success : false,
                message : "No categories found"
            })
        }
        res.status(200).send({
            success : true,
            totalCategories : categories.length,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in get All Category API",
            error
        })
    }
}

//UPDATE CATEGORY
const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, imageUrl} = req.body;
        const updatCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new : true});
         if(!updatCategory){
            return res.status(404).send({
                success : false,
                message : "No Category FOund"
            })
         }
         res.status(200).send({
            success : true,
            message : "Category Updated Successfully"
         })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Update Category API",
            error
        })
    }
}

//DELETE CATEGORY BY ID
const deleteCategoryController = async (req, res) => {
    try {  
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success : false,
                message : "Please Provide Category ID"
            })
        }

        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success : false,
                message : "No Category Found with this ID"
            })
        }

        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Category Delete API",
            error
        })
    }
}

module.exports = {createCategoryController, getAllCategoryController, updateCategoryController, deleteCategoryController};