const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
name :{
    type:String,
    required : true,
    minLength:[3 , "name is too short"]
},
slug :{
    type : String,
    required:true
},
category : {
    type : mongoose.Schema.ObjectId,
    ref :"Category",
    required:true
}
},{timestamps:true})

const SubCategoryModel = mongoose.model("SubCategory",subCategorySchema)
module.exports = SubCategoryModel