const passport = require("passport");

const Localstrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const User = require("../models/users")


passport.use("signup", new Localstrategy({

    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
},async(req,username,password,done)=>{


    const {email,fullname} = req.body

    const existuser = await User.findOne({username})

    if(!existuser){

        const newuser = new User({username,password,email,fullname})

        const salt = bcrypt.genSaltSync()
        newuser.password = bcrypt.hashSync(password,salt) 
        await newuser.save()

        return done(null,newuser)

    }


    return done(null,false,req.flash("error","ya existe user"))



    


}))



passport.use("signin", new Localstrategy({

    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
},async(req,username,password,done)=>{


    

    const existuser = await User.findOne({username})

    if(!existuser){

        return done(null,false,req.flash("error","no existe user"))


    }


    const existpass = bcrypt.compareSync(password,existuser.password)


    if(!existpass){
        return done(null,false,req.flash("error","no existe pass"))
    }


    

    return done(null,existuser)


    


}))






passport.serializeUser((user,done)=>{

    done(null,user)

})


passport.deserializeUser(async(id,done)=>{

    const user = await User.findById(id)

    done(null,user)


})
