import Model from '../Models/User_Model.js';
import bcrypt from "bcrypt";
import mongoose  from "mongoose";
import jwt from 'jsonwebtoken'


const handleErrors = (err) => {
    console.log(err.message);
    let errors = { email:'', password:''};
  
    if (err.message.includes('User validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  };



class Controller {

// async getAll(req,res,next){

//     try{
//         const response= await Model.find({})
//         res.status(200).send({success:true,response})
//     }
//     catch(err){
//         return next(err);
//     }

// }

// async get(req,res,next){
//     let id= req.params.id
//     try{
//         const response = await Model.find({_id:id})
//         if (!response) {
//             return res.status(404).send({ message: 'User not found' });
//           }
//         res.status(200).send({success:true,response})
//     }
//     catch(err){
//         return next(err)
//     }
// }
// register user
async post(req,res,next){
    const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
       const user = new Model({
        username : req.body.username,
        email:req.body.email,
        password : hashedPassword ,
        phone: req.body.phone,
        Address: req.body.Address
       })
     try{
        await user.validate();
        await user.save();
        res.status(200).send({message:"user created successfully",user:user})
     }
catch(err){
const errors =handleErrors(err)
res.status(400).json({errors})
}
}
// login 
async  login (req, res, next) {
    const { email, password } = req.body;
  
    try {
     
      const user = await Model.findOne({ email });
      if (!user) {
        return res.status(400).send('Email does not exist');
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(400).send('Invalid password');
      }
  
      // Create and send JWT token
      const token = jwt.sign({ _id: user._id, }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      res.status(200).json({
        message: "User successfully logged in",
        user: { id: user._id, email: user.email, role: user.role, token: token }
      });
    } catch (error) {
      next(error);
    }
  }
  

}
const controller= new Controller

export default controller;