const {check} = require("express-validator")
const { default: slugify } = require("slugify")
const validatorError = require("../../midellewears/validatorError")
const CategoryModel = require("../../models/productModel")
const SubCategoryModel = require("../../models/subCategoryModel")

exports.postProductValidator = [
    check("name").notEmpty().withMessage("name is required").custom((val , {req})=>{
        req.body.slug = slugify(val)
        return true
    }),
    check("price").notEmpty().withMessage("price is required").isNumeric().withMessage("price must be a number"),
    check("discount").notEmpty().withMessage("price is required").isNumeric().withMessage("price must be a number").
    custom((val , {req})=>{
        if(val >= req.body.price){
            throw new Error("priceAfterDiscount must be lower than price")
        }
    }),
    check("category").notEmpty().withMessage("categoryId is required").isMongoId().withMessage("invalid Id formate").
    custom((val)=>{
        CategoryModel.findById({_id:val}).then(result=>{
            if(!result){
             return Promise.reject(new Error(`No category for this id: ${val}`))
            }
        })
    }),
    check("subCategories").isMongoId().withMessage("invalid Id formate").custom(val=>{
        SubCategoryModel.find({_id:{$exists:true , $in:val}}).then(result=>{
            if(result.length!=val.length && result.length<1 ){
                return Promise.reject(new Error("Invalid subcategories Ids"))
            }
        })
    }).
    custom((val ,{req})=>{
         let arrId=[]
        SubCategoryModel.find({category : req.body.category}).then(result=>{
          result.map(item => arrId.push(item._id))
        })
        const checker= val.every(v=>arrId.includes(v))
        if(!checker){
         return   new Promise.reject(new Error("subcategories not belong to category"))
        }
    }
    ),
   validatorError
]