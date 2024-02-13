const express = require('express');
const { getUserController, updateUserController,
        udpatePasswordController, resetPasswordController, 
        deleteUserController
     } = require('../controllers/userContoller');
const authMiddleware = require('../middlewares/authMiddleware');



const router = express.Router();

// Routes
// GET USER || GET
router.get('/getuser',authMiddleware, getUserController)


// UPDATE PROFILE 
router.put('/updateUser',authMiddleware, updateUserController);

//Password Update
router.post('/udpatePassword',authMiddleware, udpatePasswordController)

//RESET PASSWORD 
router.post('/resetPassword',authMiddleware, resetPasswordController)

//DELETE USER
router.delete("/deleteUser/:id", authMiddleware, deleteUserController)
module.exports=router