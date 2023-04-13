import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import AdminRouter from './Routes/Admin_Routes.js'
import UserRouter from './Routes/User_Routes.js'
import FormRouter from './Routes/ContactUs_Routes.js';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
dotenv.config()
 await connectDB()
const PORT = process.env.PORT || 5000;
const app = new express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('API is running ...');
})
app.use("/api/admin",AdminRouter)
app.use("/api/user",UserRouter)
app.use("/api/form",FormRouter)

app.listen(PORT,console.log(
    
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}  `
))