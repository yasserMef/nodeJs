const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/productModel");
const ApiError = require("../util/ApiError")
const slugify = require("slugify");
const ApiFeatures = require("../util/apiFeatures")
const { query } = require("express");



exports.postProductService = asyncHandler(async(req,res)=>{
    req.body.slug = slugify(req.body.name)
    const product = await ProductModel.create(req.body)
    res.status(201).json({
        data : product
    })
})

exports.getProductsService = asyncHandler(async(req,res)=>{

   /* let queryObject = {...req.query}
    const excludesFields=["sort","limit","page","fields"]
    excludesFields.map(obj=> delete queryObject[obj])
    let queryString = JSON.stringify(queryObject)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g , (match)=>`$${match}`)
    
   
   const page = req.query.page*1 || 1
    const limit = req.query.limit*1||5
    const skip = (page-1)*limit
    
   

    let mongooseQuery = ProductModel.find(JSON.parse(queryString)).skip(skip).limit(limit).populate({path:"category",select:"name"})
    if(req.query.sort){
        const sortobject = req.query.sort.split(",").join(" ")
        console.log(sortobject)
      mongooseQuery=  mongooseQuery.sort(sortobject)
     }

     if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ")
        mongooseQuery=  mongooseQuery.select(fields)
     }

     if(req.query.keyword){
        query={}
       query.$or = [
        {name:{$regex:req.query.keyword , $options:"i"}},
        {description:{$regex:req.query.keyword}}
       ]
       mongooseQuery = mongooseQuery.find(query)
     }
    */
   const apiFeatures = new ApiFeatures(ProductModel.find() , req.query).
   filter().sort().field().word().paginate()
    const products = await apiFeatures.mongooseQuery
    res.status(201).json({
      results:products.length,
      
      data:products
    })
})





exports.getOneProductServive = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    const product = await ProductModel.findById(id)
    if(!product){
        return next(new ApiError("Not product for this "+id))
    }
    res.status(201).json({
        data:product
    })
})

exports.updateProductServive = asyncHandler(async(req,res,next)=>{
    const id = req.params.id
    req.body.slug = slugify(req.body.name)
    const product = await ProductModel.findOneAndUpdate({_id:id},req.body,{new:true})
    if(!product){
        return next(new ApiError("Not product for this "+id))
    }
    res.status(201).json({
        data:product
    })
})

exports.deleteProductService = asyncHandler(async(req,res,next)=>{
   const id = req.params.id
   const product = await ProductModel.findOneAndDelete({_id:id})
   if(!product){
    return next(new ApiError("Not product for this "+id))
   }
   res.send()
})