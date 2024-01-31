const mongoose = require("mongoose")

const categorySchema= new mongoose.Schema({
name : {
    type:String,
    required:true,
    unique: [true, 'Category must be unique'],
    minLenght :[3 , "too short name"],
    
},
slug :{
    type:String,
    lowercase:true
},
image : {
    type :String,
    required:true
}

},{timestamps:true}
)
const CategoryModel = mongoose.model("Category",categorySchema)
module.exports = CategoryModel