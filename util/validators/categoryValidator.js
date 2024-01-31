const {check} = require("express-validator")
const validatorError = require("../../midellewears/validatorError")
const { default: slugify } = require("slugify")

exports.postCategoryValidator = [
    check("name").notEmpty().withMessage("name is required").isLength({min:3}).withMessage("name too short").
    custom((category , {req})=>{
        req.body.slug = slugify(category)
         return true
    }),
    validatorError
]