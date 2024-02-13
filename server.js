const express  = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dataBaseConnection = require('./config/db');


// app object
const app = express();

// dot env configuration
dotenv.config();

// Database connection
dataBaseConnection()


// middleware 
app.use(cors());
app.use(express.json());


//routes
app.use('/api/v1/test', require("./routes/testRoutes"));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/resturant',require("./routes/resturantRoutes"));
app.use('/api/v1/category',require('./routes/categoryRoutes'));
app.use('/api/v1/food',require( './routes/foodRoutes'));
// URL => http://localhost:8080
app.get('/',(req,res)=>{
    return res.status(200).send('<h1>Welcome to resturant server</h1>')
});

// PORT 
const PORT =process.env.PORT || 8000 ;

app.listen(PORT, ()=>{
    console.log(`Server Running  on ${PORT}`);
});