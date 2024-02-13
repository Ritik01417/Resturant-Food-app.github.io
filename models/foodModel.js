const mongoose=require('mongoose')

// Schema
const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Food is required']
    },
    description:{
        type:String,
        required:[true, ' Food description is required'],
    },
    price:{
        type:String,
        required:[true, "Food price is required"]
    },
    imageUrl:{
        type:String,
        default:'https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Editable-Photoshop-Food-Logo-Design-PNG-Transparent-1536x1536.png'
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    resturant:{
        // For building  the relationship between Food and Resturants 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant' // here we give the refrence of Resturant 
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5,
    },
    ratingCount:{
        type:String,
    },

},{timestamps:true})

module.exports=mongoose.model('Foods',foodSchema)