const cors = require('cors')
const express = require('express')
const cookieParser = require("cookie-parser")
require('dotenv').config();
const connectDB = require('./config/db')
const router = require('./routes/index');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(cors());
// {
    //     origin: process.env.FRONTEND_URL,
    //     method: ["POST", "GET", "PUT", "DELETE"],
    //     credentials: true
    // },
app.use(express.json({ limit: '10mb' })) // photo should be under limit mb
mongoose.connect(process.env.MONGODB_URI)
app.use(cookieParser())

app.use("/api", router)

const PORT = 8080 || process.env.PORT

connectDB().then(() =>{
    app.listen(PORT, ()=>{
        console.log("Conneted to DB")
        console.log("Server is running")
    })
})
