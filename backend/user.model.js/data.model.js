const mongoose=require("mongoose")

//user schema
const dataSchema=mongoose.Schema({
   
        image:String,
        name:String,
        price:String
    
},{
    versionKey:false
})

const dataModel=mongoose.model("data",dataSchema)

module.exports={
    dataModel
}