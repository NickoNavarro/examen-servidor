var express = require('express');
const passport = require('passport');
const { isloged, notisloged } = require('../helpers/authenticated');
var router = express.Router();
const Coche = require("../models/coches")
/* GET home page. */
router.get('/get',  isloged, async(req, res, next) =>{

    const coches = await Coche.find({})




  res.render('crudGet',{coches});
});




router.get('/crear',  isloged,function(req, res, next) {
    res.render('crudPost');
  });

router.post('/crear', isloged,async (req, res, next)=> {
    
    const {nombre,img,descripcion} = req.body

    const data = {
        nombre,
        img,
        descripcion,

        user:req.user._id
    }

    const coche  = new Coche(data)

    await coche.save()

    return res.redirect("/crud/get")

  });





  router.get('/delete/:id',  isloged, async(req, res, next) =>{

    const {id} = req.params

    await Coche.findByIdAndDelete(id)

    req.flash("success","coche borrado")
    res.redirect("/crud/get")




  
});


router.get('/edit/:id',  isloged, async(req, res, next) =>{

    const {id} = req.params

   const cocheedit= await Coche.findById(id)

   
    res.render("crudEdit",{cocheedit})


});


router.post('/edit/:id',  isloged, async(req, res, next) =>{

    const {id} = req.params
    const {nombre,img,descripcion} = req.body
    const data  = {
        nombre,
        img,
        descripcion,
        user:req.user.id

    }

    await Coche.findByIdAndUpdate(id,data)

   
    res.redirect("/crud/get")


});



router.get('/get',  isloged, async(req, res, next) =>{

    

   const coches= await Coche.find({})

   
    res.json({

        msg:"coches",
        coches
    })


});



module.exports = router