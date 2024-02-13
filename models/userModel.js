const mongoose=require('mongoose')

// schema
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, 'user name is required']
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique: true
    },
    password :{
        type: String,
        required: [true,'password is required'],
    },
    address:{
        type:Array ,
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type: String,
        required:[true,'user type is required'],
        default: 'client',
        enum:['client', 'admint', 'vendor','driver']
    },
    profile:{
        type:String,
        default:'https://www.bing.com/th?id=OIP.nRNwBsXMPfthOqaIzKhNwwHaHP&w=150&h=147&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    },
    answer:{
        type:String,
        required:[true,'Answer(For Reset password) is required']
    }
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)