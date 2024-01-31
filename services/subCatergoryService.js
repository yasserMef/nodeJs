const asyncHandler = require('express-async-handler')
const subCategoryModel = require("../models/subCategoryModel")
const ApiError = require("../util/ApiError")
const slugify = require("slugify")

exports.setCategoryId = (req,res,next)=>{
   if(req.params.categoryId){
      req.body.category =  req.params.categoryId
   }
   next()
}

exports.postSubCategoryService = asyncHandler(async(req,res)=>{
   const name = req.body.name
   const slug = slugify(name)
   const category= req.body.category;
   console.log(req.params.categoryId)
   const subCategory = await subCategoryModel.create({name,slug,category})
   res.status(201).json({
    data : subCategory
   })
})
exports.createFilterObject = (req,res,next)=>{
   let filterObject ={}
   if(req.params.categoryId){
    filterObject = {category:req.params.categoryId}
   }
   req.filterObject = filterObject
   next()
}


exports.getAllSubCategoriesService = asyncHandler(async(req,res)=>{
   const limit = req.query.limit*1|| 10
   const page = req.query.page*1||1
   const skip = (page-1)*limit
   const subCategories=await subCategoryModel.find(req.filterObject).limit(limit).skip(skip)
   res.status(201).json({
      results:subCategories.length,
      page ,
      data : subCategories,
    })
})

exports.getOneSubCategory = asyncHandler(async(req,res,next)=>{
   const id = req.params.id
   const subCategory = await subCategoryModel.findById({_id:id})
   if(!subCategory){
    return next(new ApiError(`No category for this id ${id}`,400))
   }
   res.status(201).json({
      data:subCategory
   })
})

exports.updateSubCategory = asyncHandler(async(req,res,next)=>{
   const id = req.params.id
   req.body.slug = slugify(req.body.name)
   const subCategory = await subCategoryModel.findOneAndUpdate({_id:id},req.body,{new:true})
   if(!subCategory){
      return next(new ApiError(`No category for this id ${id}`,400))
   }
   res.status(201).json({
      data:subCategory
   })
})

exports.deleteSubCategory = asyncHandler(async(req,res,next)=>{
   const id = req.params.id
   const subCategory = await subCategoryModel.findOneAndDelete({_id:id})
   if(!subCategory){
      return next(new ApiError(`No category for this id ${id}`,400))
   }
   res.send()
}
)