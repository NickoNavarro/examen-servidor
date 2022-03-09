var express = require('express');
const passport = require('passport');
const { isloged } = require('../helpers/authenticated');
var router = express.Router();

/* GET home page. */
router.get('/signup',  function(req, res, next) {
  res.render('signup');
});



router.post('/signup',  passport.authenticate("signup",{

    successRedirect:"/auth/signin",
    failureRedirect:"/auth/signup"
}));


/* GET home page. */
router.get('/signin',   function(req, res, next) {
    res.render('signin');
  });
  
  
  
  router.post('/signin', passport.authenticate("signin",{
  
      successRedirect:"/",
      failureRedirect:"/auth/signin"
  }));
  


  router.get('/logout',  function(req, res, next) {

    req.logOut()
    res.redirect('/auth/signin');
  });
  

module.exports = router;
