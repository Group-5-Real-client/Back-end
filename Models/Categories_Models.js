import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const categorySchema = new Schema({
    
        
      
        name: {
            type: String,
            required: [true, "Please enter a valid name"],
        },
        description: {
            type: String,
            required: [true, "Please enter the description"],
        },

        // image:{
        //     type: String,
        //     required: [true, "Please upload the image"],
        // }

     },
  
        {
            collection: 'books',
            timestamps: true
        });
 

  
  const Category = model('Category', categorySchema);
  export default Category;




// import mongoose from "mongoose";
// const { Schema, model } = mongoose;

// const categorySchema = new Schema(
//     {
        
      
//         name: {
//             type: String,
//             required: [true, "Please enter a valid name"],
//         },
//         description: {
//             type: String,
//             required: [true, "Please enter the description"],
//         },
//         image:{
//             type: String,
//             required: [true, "Please upload the image"],
//         }

//     },
//     {
        
//         collection: "categories",
//         timestamps: true,
//     }

// );


// const Category = model("Category", categorySchema);
// export default Category;