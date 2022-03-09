const {Schema,model} = require("mongoose")


const cocheSchema = new Schema({

    nombre:String,
    img:String,
    descripcion:String,

    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})



module.exports = model("coches", cocheSchema)