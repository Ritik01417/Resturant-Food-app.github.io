const { model } = require("mongoose");
const resturantModel = require("../models/resturantModel");

// CREATE RESTURANT
const createResturantController = async(req,res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body; // destructuring the request body to get the data we need

    //validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and address",
      });
    }
    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save()

    res.status(201).send({
        success:true,
        message:'New Resturant is Created Successfully',
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Resturant API",
      error,
    });
  }
};

// GET ALL RESTURANT 
const getAllResturantController=async (req, res)=>{
  try {
    const resturants = await resturantModel.find({})
    if(!resturants){
      return res.status(404).send({
        success:false,
        message:'No  Resturant Found',
      })
    }
    res.status(200).send({
      success: true,
      totalCount:resturants.length,
      resturants
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:'Error in Get ALL Resturant API',
      error
    })
  }
}

// GET RESTURANT BY ID 
const getResturantBYID= async(req,res)=>{
  try {
    const resturantId = req.params.id
    // validation of ID
    if(!resturantId){
      return res.status(404).send({
        success:false,
        message:'Please Provide Resturant ID'
      })
    }
    // find resturant
    const resturant = await resturantModel.findById(resturantId)
    if(!resturant){
      return res.status(404).send({
        success:false,
        message:'No resturant Found',
      })
    }
    res.status(200).send({
      success:true,
      resturant,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in Get Resturant BY Id API',
      error
    })
  }
}

// DELETE RESTURANT CONTROLLER
const deleteResturantController =async(req,res)=> {
  try {
    const resturantId =req.params.id
    if(!resturantId){
      return res.status(404).send({
        success:false,
        message:'No Resturant Found OR Provide Resturant ID'
      })
    }
    await resturantModel.findByIdAndDelete(resturantId)
    res.status(200).send({
      success:true,
      message:'Resturant Deleted Successfully!!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in Delete Resturant API',
      error
    })
  }
}
module.exports = { createResturantController ,getAllResturantController , getResturantBYID , deleteResturantController};
