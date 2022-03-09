const {Schema,model} = require("mongoose")


const userSchema = new Schema({

    username:String,
    password:String,
    email:String,
    fullname:String
})



module.exports = model("users", userSchema)