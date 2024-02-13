const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCategoryConroller, updateCategoryController, deleteCategoryController,  } = require('../controllers/categoryController');



const router = express.Router();

// Routes
//  CREATE category || POST
router.post('/create', authMiddleware ,createCatController)

// GET ALL CATEGORY
router.get('/getAll' , getAllCategoryConroller)
// update Category  by ID || PUT
router.put('/update/:id', authMiddleware , updateCategoryController)

//Dalete Category
router.delete('/delete/:id', authMiddleware, deleteCategoryController);

module.exports=router