
import mongoose from 'mongoose';
const {Schema, model} = mongoose;
import validator from 'validator';

const AdminSchema= new Schema({

username:{
    type:"string",
    required:[true, 'Please enter an username'],
},
email:{
  type: String,
  required: [true, 'Please enter an email'],
  validate: [validator.isEmail, 'Please enter a valid email']
},
password: {
  type: String,
  required: [true, 'Please enter an Password'],
  minlength:[6, 'Password must be at least 6 characters long']
},

isSuper:{
  type:Boolean,
  required:true
}
},
  {
    collection:"admins",
   timestamps: true,
});
const Admin =model('Admin',AdminSchema)
export default  Admin;

