const mongoose = require('mongoose')

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        // console.log("DB connected")
    } catch (error) {
        console.log("Error occurred in DB.js", error)
    }
}

module.exports = connectDB