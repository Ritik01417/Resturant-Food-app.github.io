const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
//GET USER INfO 
const getUserController=async(req,res)=>{
    try {
        // find user
        const user = await userModel.findById({_id:req.body.id})
        // validation 
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not found'
            })
        }
        // hide password 
        user.password=undefined;
        // response
        res.status(200).send({
            success:true,
            message:'User Get Successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API'
        })
    }
};

// UPDATE USER
const updateUserController=async(req,res)=>{
    try {
        // find user
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not found'
            })
        }

        // update
        const {userName,address,phone,}=req.body
        if(userName) user.userName=userName
        if(address) user.address = address
        if(phone) user.phone=phone

        // now save user new details
        await user.save();
        res.status(200).send({
            success:true,
            message:'User Update Successfully'
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update User API',
            error
        })
    }
}

//UPDATE USER PASSWORD
const udpatePasswordController=async(req,res)=>{
    try {
        // find user
        const user =await userModel.findById({_id:req.body.id})
        // validataion
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found '
            })
        }
        // get data from user
        const {oldPassword,newPassword}=req.body
        if(!oldPassword|| !newPassword){
            return res.status(500).send({
                success:false,
                message:'Please Provide Old or New Password'
                
            })
        }
        // check old password is correct or not
        const isMatch =await  bcrypt.compare(oldPassword,user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Old Password Is Wrong"
            });
        }
    user.password=newPassword;    

    //Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);
    user.password = hashedPassword;
    await user.save()
    res.status(200).send({
        success:true,
        message:'Password Updated !'
    });
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in Password Udate API',
        error
       }) 
    }
}
// RESET PASSWORD 
const resetPasswordController = async(req,res)=>{
    try {
        const {email,newPassword,answer}=req.body
        if(!email ||!newPassword || !answer ){
            return res.status(404).send({
                success:false,
                message:'Please provide All fields'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'User Not Found or Invalid answer'
            })
        }
        // Hashing Password 
        const salt  = bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt)
        user.password=hashedPassword
        await user.save()
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Reset Password API',
            error
        })
    }
}
// DELETE USER  ACCOUNT 
const deleteUserController= async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'Your Account has been Deleted',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Delete API'
        })
    }
}
module.exports={getUserController, updateUserController, udpatePasswordController,resetPasswordController,deleteUserController}