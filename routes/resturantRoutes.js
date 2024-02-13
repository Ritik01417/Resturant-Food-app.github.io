const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantBYID, deleteResturantController } = require('../controllers/resturantController');



const router = express.Router();

// Routes
//  CREATE RESTURANT || POST
router.post('/create',authMiddleware, createResturantController)

// GET ALL RESTURANT || GET
router.get('/getAll', getAllResturantController)

// GET RESTURANT BY ID || GET
router.get('/get/:id',getResturantBYID );

//DELETE RESTURANT BY ID || GET
router.delete('/delete/:id',authMiddleware, deleteResturantController )
module.exports=router