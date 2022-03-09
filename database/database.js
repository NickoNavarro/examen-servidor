const mongoose = require("mongoose")


if(process.env.NODE_ENV=="produccion"){

    var mongo = process.env.DATABASEPROD

}else{
    var mongo = process.env.DATABASE
}

const db =async ()=>{

    try{
        await mongoose.connect(mongo,{
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 

        console.log("DB conected")


    }catch(err){

        console.log(err)
    }


}



module.exports = db