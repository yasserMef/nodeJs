const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const database = require("./config/database")
const ApiError = require("./util/ApiError")
const categoryRouter = require("./routers/categoriesRoute")
const subCategoriesRouter = require("./routers/subCategoryRoute")
const productRouter = require("./routers/productRouter")
dotenv.config({path:"config.env"})

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
    console.log(process.env.NODE_ENV)
}


database();
app.use(express.json())


app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/subCategories",subCategoriesRouter)
app.use("/api/v1/products", productRouter)


app.all("*",(req,res,next)=>{
  next(new ApiError(`Can't find this route: ${req.originalUrl}`,400))
})

app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500 
    err.status = err.status || "error"
    res.status(err.statusCode).json({
        statusCode : err.statusCode,
        status :err.status,
        message:err.message,
        stack : err.stack
    })
})


const PORT = process.env.PORT || 8000

const server =app.listen(PORT,()=>{
    console.log("hello word")
})

process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection : ${err.name}|${err.message}`)
    if(server.close){
        process.exit(1)
    }

})