const categoryModel = require("../models/categoryModel");

// CREATE CATEGORY
const createCatController=async(req,res)=>{
    try {
        const {title,imageUrl}=req.body;
        // validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:'Please provide Category title or image'
            })
        }
        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:'Category Created !!',
            newCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Category API'
        })
    }
}

// GET ALL CATEGORY 
const getAllCategoryConroller=async(req,res)=>{
    try {
        const  categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success:false,
                message:'No Categories Found',

            })
        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get All Category API',
            error,
        })
    }
}

// Update Category Controller
const updateCategoryController=async(req,res) =>{
    try {
        const {id}=req.params;
        const {title, imageUrl}=req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id, 
            {title,imageUrl},
            {new:true}
        )
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'No Category Found'
            })
        }
        res.status(201).send({
            success: true,
            message:'Category Updated Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: ' Error in  update Category API.',
            error
        });
    }

}
// DELETE CATEGORY CONTROLLER
const  deleteCategoryController= async (req,res)=>{
    try {
        const {id}=req.params
        if(!id){
            return res.status(500).send({
                success:false,
                message:'Please  provide category ID.'
            })
        }
        const category=await categoryModel.findById(id)
        if (!category) {
            return res.status(500).send({
                success: false,
                message: "Category not found with this ID"
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message: 'Category has been Deleted Successfully.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Delete Category API',
            error
        })
    }
}
module.exports={createCatController, getAllCategoryConroller , updateCategoryController, deleteCategoryController}