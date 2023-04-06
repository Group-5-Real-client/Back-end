import mongoose from 'mongoose';
const {Schema, model} = mongoose;


const UserSchema= new Schema({

username:{
    type:"string",
    required:'true'
},
email:{
    type:"string",
   required:"true"
},
password:{
    type:"string",
    required:"true"

},
role:{
    
}

});