const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// Create Food
const createFoodController=async(req,res) =>{
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
            resturant, 
            rating, 
            ratingCount
        }=req.body;
        
        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success:false,
                message:'Please Provide all fields'
            })
        }
        const newFood =new foodModel({
            title,
            description,
            price, 
            imageUrl, 
            foodTags, 
            category,
            code, 
            isAvailable, 
            resturant, 
            rating, 
            ratingCount
        })
        await newFood.save()
        res.status(201).send({
            success:true,
            message:'New Food Item is Created ',
            newFood,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Food API',
            error
        })
    }
}
// GET ALL FOODS CONTROLLER
const  getAllFoodsController=async(req,res)=>{
    try {
        const foods =await foodModel.find({})
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'No food Items found'
            })
        }
    res.status(200).send({
        success:true,
        totalFoods:foods.length,
        foods,
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GET All Food API'
        })
    }
}
// SINGLE FOOD CONROLLER
const getSingleFoodController=async(req,res)=>{
    try{
        const foodId= req.params.id;
        // validation of id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Please provide a ID'
            })
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food  Item Found with the given ID'
            })
        }
        res.status(200).send({
            success:true,
            food,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GET Single Food API',
            error
        })
    }
}

// GET FOOD BY RESTURANT
// SINGLE FOOD CONROLLER
const getFoodByResturantController=async(req,res)=>{
    try{
        const ResturantId= req.params.id;
        // validation of id
        if(!ResturantId){
            return res.status(404).send({
                success:false,
                message:'Please provide a ID'
            })
        }
        const food = await foodModel.find({resturant :ResturantId})
        if(!food){
            return res.status(404).send({
                success:false,
                message:'No Food  Item Found with the given ID'
            })
        }
        res.status(200).send({
            success:true,
            message:'Food based on Resturant',
            food,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in GET Food By Resturant API',
            error
        })
    }
}
// UPDATE FOOD CONTROLLER
const updateFoodController=async(req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'No Food Id Found'
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            return res.status(404).send({
                success:false,
                message:'No Food Found'
            })
        }
        const {
            title,
            description,
            price, 
            imageUrl, 
            foodTags, 
            category,
            code, 
            isAvailable, 
            resturant, 
            rating, 
            ratingCount
        }=req.body;
        const updatedFood= await foodModel.findByIdAndUpdate(foodId,{
            title,
            description,
            price, 
            imageUrl, 
            foodTags, 
            category,
            code, 
            isAvailable, 
            resturant, 
            rating, 
            ratingCount
        }, {new :true})
        res.status(200).send({
            success:true,
            message:'Food Item Updated!!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Update Food API',
            error
        })
    }
}

// DELETE FOOD CONTROLLER
const deleteFoodController = async (req,res)=>{
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:'Provide Food Id'
            })
        }
        const food = await foodModel.findById(foodId)
        if (!food) {
            res.status(404).send({
                success:false,
                message:'No Food Found with ID'
            })
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            success:true,
            message:'Food Item Deleted Successfully '
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Delete Food API',
            error
        })
    }
}

// PLACE ORDER CONTROLLER
const placeOrderController=async(req,res)=> {
    try {
        const {cart }=req.body
        if(!cart ) {
            return res.status(500).send({
                success:false,
                message:'Please Food Cart or Payment Method'
            })
        }
        let total =0;
        // calcultation
        cart.map((i)=>{
            total += i.price 
        })
        const newOrder = new orderModel({
            foods:cart,
            payment: total,
            buyer:req.body.id
        })
        await newOrder.save();
        res.status(200).send({
            success:true,
            message:'Order Placed Successfully ',
            newOrder,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Place Order API',
            error
        })
    }
}

// CHANGE ORDER STATUS 
const changeOrderStatusController =async(req,res)=>{
    try {
        const orderId =req.params.id
        if(!orderId){
            return res.status(500).send({
                success:false,
                message:'Please Provide valid Order Id'
            })
        }
        const {status} = req.body
        if (!status ) {
            return res.status(500).send({
                success: false,
                message: 'Please provide the status of Order.'
              });
        }
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new : true})
        res.status(200).send({
            success:true,
            message:'Order Status Updated Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Order Status API',
            error
        })
    }
}
module.exports={
    createFoodController , getAllFoodsController ,
    getSingleFoodController, getFoodByResturantController, 
    updateFoodController, deleteFoodController,
    placeOrderController ,changeOrderStatusController
};