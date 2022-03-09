var express = require('express');
const passport = require('passport');
var router = express.Router();

const notisloged = (req,res,next)=>{


    if(!req.isAuthenticated()){

        return res.redirect("/auth/signin")
    }

    next()
}



const isloged = (req,res,next)=>{


    if(req.isAuthenticated()){


       return next()
        
    }

    return res.redirect("/auth/signin")
}


module.exports = {
    notisloged,
    isloged
}
