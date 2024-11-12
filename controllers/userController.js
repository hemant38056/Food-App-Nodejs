const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

// GET USER INFO
const getUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({_id:req.body.id});

        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }

        //hide password
        user.password = undefined;

        //response
        res.status(200).send({
            success : true,
            message : 'User Get Successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in Get User API',
            error
        })
    }
}

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        //find User
        const user = await userModel.findById({_id : req.body.id});

        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }

        //update
        const {userName, address,  phone} = req.body;
        if(userName){
            user.userName = userName;
        }

        if(address){
            user.address = address;
        }

        if(phone){
            user.phone = phone;
        }

        //save user
        await user.save();
        res.status(200).send({
            success : true,
            message : 'User Updated Successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in Update User API',
            error
        })
    }
}

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success : false,
                message : "Please Provide All Fields" 
            })
        }

        const user = await userModel.findOne({email, answer});
        if(!user){
            return res.status(500).send({
                success : false,
                message : "User Not Found Or Invalid answer"
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success : true,
            message : "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Password Reset API",
            error
        })
    }
}

//UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({_id : req.body.id});

        //validation
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User Not Found"
            })
        }

        // get data from user
        const {oldPassword, newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success : false,
                message : "Please Provide Old or New Password"
            })
        }
        
        //check user old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(500).send({
                success : false,
                message : "Invalid Old Password"
            })
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success : true,
            message : "Password Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error In Password Update API',
            error
        })
    }
}

//DELETE PROFILE ACCONT
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success : true,
            message : "Your Account Has Been Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error In Delete Profile API',
            error
        })
    }
}

module.exports = {getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController};