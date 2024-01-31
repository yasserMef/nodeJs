const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name :{
          type:String,
          required:true,
          trim:true,
          unique:true,
          minLength :[3,"name too short"]
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
          type:String,
          minLength :[15,"name too short"]
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type :Number
    },
    imageProfile:{
        type:String,
        required:true,
    },
    images:[String],
    colors:[String],
    category:{
       type : mongoose.Schema.ObjectId,
       ref :"Category",
       required:true
    },
    subCategories:[{
        type : mongoose.Schema.ObjectId,
        ref :"SubCategory",
    }]
},{timestamps:true})

const CategoryModel = mongoose.model("Product" , productSchema)
module.exports= CategoryModel