const mongoose = require("mongoose")

const database = ()=>{
  return mongoose.connect(process.env.URI).
  then(conn=>console.log(conn.connection.host)).
  catch(err=>{
    console.log(`err:${err}`)
    process.exit(1)
})
}
module.exports= database
