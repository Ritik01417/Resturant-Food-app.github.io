const mongoose = require('mongoose')

// function to create database connection

const  dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Connected to database ${mongoose.connection.host}`)
    } catch (error) {
        console.log("Database error",error)
        
    }
}

module.exports =dataBaseConnection;