const express = require('express');
const { registController,
        loginController, 
     } = require('../controllers/authController');



const router = express.Router();

// Routes
//REGISTER || POST
router.post('/register',registController)

//LOGIN || POST
router.post('/login',loginController )
module.exports=router