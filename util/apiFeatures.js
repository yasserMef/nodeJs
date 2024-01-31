class ApiFeatures {
    constructor(mongooseQuery ,queryStr){
        this.mongooseQuery = mongooseQuery
        this.queryStr = queryStr
    }
    filter(){
    let queryObject = {...this.queryStr}
    const excludesFields=["sort","limit","page","fields"]
    excludesFields.map(obj=> delete queryObject[obj])
    let queryString = JSON.stringify(queryObject)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g , (match)=>`$${match}`)
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString))
    return this;
    }

    sort(){
        if(this.queryStr.sort){
            const sortobject = this.queryStr.sort.split(",").join(" ")
            console.log(sortobject)
          this.mongooseQuery=  this.mongooseQuery.sort(sortobject)
         }
       return this;
    }

    field(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(",").join(" ")
            this.mongooseQuery=  this.mongooseQuery.select(fields)
         }
         return this;
    }
    
    word(){
        if(this.queryStr.keyword){
            let queryS={}
           queryS.$or = [
            {name:{$regex:this.queryStr.keyword , $options:"i"}},
            {description:{$regex:this.queryStr.keyword}}
           ]
          
           this.mongooseQuery = this.mongooseQuery.find(queryS)
         }
         return this;
    }

    paginate(){
        const page = this.queryStr.page*1 || 1
        const limit = this.queryStr.limit*1||5
        const skip = (page-1)*limit
      this.mongooseQuery = this.mongooseQuery.limit(limit).skip(skip)  
      return this  
    }
}
module.exports = ApiFeatures