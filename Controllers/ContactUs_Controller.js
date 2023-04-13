import Model from '../Models/ContactUs_Model.js'

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


class Controller{


   async getAll (req,res,next){
    try{
    const response = await  Model.find({})
    res.status(200).send({success:true,response})
    }
    catch(err){
        return next(err);
    }
}

async get(req,res,next){
    let id=req.params.id;
try{
    const response = await Model.find({_id:id })
    res.status(200).send({success:true,response})
    if(!response){
        res.status(404).send({message:"not found"})
    }
}
    catch(err){
return next(err);
    }

}

async post(req,res,next){

const form = new Model({
    email: req.body.email,
    message:req.body.message,
    Date:req.body.Date,
    title:req.body.title,
    User:req.body.User,
})
try{
    await form.validate();
    await form.save()
    res.status(200).send({success:true})
}
catch(err){
    const errors =handleErrors(err)
res.status(400).json({errors})
}

}

async delete(req,res,next){
    let id = req.params.id
    
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


const controller = new Controller();
export default controller