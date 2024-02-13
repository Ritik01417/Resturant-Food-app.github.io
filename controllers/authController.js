const userModel = require("../models/userModel")
const bcrypt =require('bcrypt');
const JWT = require('jsonwebtoken');
//REGISTER
const registController =async(req,res)=>{
    try {
        const {userName,email,password,phone,address,answer}=req.body;
        // validation
        if(!userName || !email || !password||!phone||!address|| !answer)
         return res.status(500).send({
        success:false,
        message:'Please Provide All Fields'
        })

        // check user
        const existing=await userModel.findOne({email})
        if (existing){
            return  res.status(500).send({
                success: false,
                message:'Email Already Registered please login'
            }) 
        } 

        //Hashing for password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =await bcrypt.hash(password,salt)

        // create new user
        const user =await userModel.create({
            userName,
            email,
            password : hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success:true,
            message:'Successfully Registered',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Register API',
            error
        })
    }
}
//LOGIN 
const loginController=async (req,res)=>{
    try {
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return  res.status(500).send({
                success: false,
                message:"Please provide Email OR Password",
            })
        }

        //check user
        const user= await userModel.findOne({email:email})
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not found "
            })
        }

        // check user password or comapre password
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){ 
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            });
        }

        // token 
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn: '7d',
        })
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login API",
            error
        })
    }
}


module.exports={registController,loginController };