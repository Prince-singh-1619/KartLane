const cors = require('cors')
const express = require('express')
const cookieParser = require("cookie-parser")
require("dotenv").config();
const connectDB = require('./config/db')
const router = require('./routes/index');
const { default: mongoose } = require('mongoose');

const app = express();
// const allowedOrigins = [process.env.FRONTEND_URL || "https://kart-lane-app.vercel.app"];
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        method: ["POST", "GET", "PUT", "DELETE"],
    },
))

//
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "https://kart-lane-app.vercel.app"); 
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

console.log("process.env.FRONTEND_URL : ", process.env.FRONTEND_URL)

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
