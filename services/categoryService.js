const asyncHandler = require('express-async-handler')
const CategoryModel = require("../models/catagoriesModel")
const slugify = require("slugify")



exports.postCategory = asyncHandler(async(req,res)=>{
    const name = req.body.name
    const image = req.body.image
    const slug = slugify(req.body.name)
  const newCategory = await CategoryModel.create({name,slug,image})
  res.status(201).json({
    data : newCategory
  })
})
exports.getAllCategories = asyncHandler(async(req,res)=>{
  const limit = req.query.limit*1|| 5
  const page = req.query.page*1 || 1
  const skip = (page-1)*limit
  const categories = await CategoryModel.find().limit(limit).skip(skip)
  res.status(201).json({
    results:categories.length,
    page:page,
    data:categories
  })
})

exports.getOneCategory = asyncHandler(async(req,res,next)=>{
  const id = req.params.id
  const category = await CategoryModel.findById({_id:id})
  if(!category){
    res.status(400).json({
       msg: `No category for this id ${id}` 
    })
  }
  res.status(201).json({
    data:category
  })
})

exports.updateCategory = asyncHandler(async(req,res)=>{
  const id = req.params.id
  req.body.slug = slugify(req.body.name)
  const category = await CategoryModel.findOneAndUpdate({_id:id},req.body,{new:true})
  if(!category){
    res.status(400).json({
      msg: `No category for this id ${id}`
    })
  }
  res.status(201).json({
    data:category
  })
})

exports.deleteCategory = asyncHandler(async(req,res)=>{
  const id = req.params.id
    const category = await CategoryModel.findByIdAndDelete({_id:id})
    if(!category){
      msg :`No category for this id ${id}`
    }
    res.send()
})