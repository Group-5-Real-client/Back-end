import Model from "../Model/Admin_Model.js"
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

    // get all users

    async  getAll(req,res,next){
        try{
            const response=await Model.find({});
            res.status(200).send({success:true,response})
        }
        catch(err){
            return next(err);
        }
    }

     // get user by id

     async get(req,res,next){
        try{
            let id = req.params.id;
            const response =await Model.findOne({ _id: id});
            if (!response) {
              return res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send({success:true,response})
        }
        catch(err){
            return next(err);
     }
    }

    // new user Register

    async post(req,res,next){
        const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
           const user = new Model({
            username : req.body.username,
            email:req.body.email,
            password : hashedPassword ,
            isSuper:req.body.isSuper,
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

  //   async login(req,res,next){
  //   const emailExist = await Model.findOne({email:req.body.email});
  //   if(!emailExist) return res.status(400).send("email doesn't exist");
  //   const validPass = await bcrypt.compare(req.body.password, emailExist.password);
  //   if(!validPass) return res.status(400).send('Invalid password');
    
  //   // create a token
  //   const token = jwt.sign({_id:Model._id},process.env.TOKEN_SECRET)  ;
  //   res.header('auth-token', token).send(token)

  // }
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
      const token = jwt.sign({ _id: user._id, isSuper: user.isSuper }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
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
  


    // edit user
    async patch(req, res, next) {
      const { id } = req.params;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    
      try {
        const response = await Model.findOneAndUpdate(
          { _id: id },
          req.body,
          { new: true }
        );
        if (!response) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message:'user updated successfully',success: true, response });
      } catch (err) {
        console.log(err);
      }
    }
    
    
    // delete user

    async delete(req, res, next) {
      const id = req.params.id;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid user ID' });
      }
    
      try {
        const response = await Model.findOneAndDelete({ _id: id });
        if (!response) {
          return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
    

}
const controller = new Controller
export default controller