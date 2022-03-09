var express = require('express');
const passport = require('passport');
const { isloged, notisloged } = require('../helpers/authenticated');
var router = express.Router();
const Coche = require("../models/coches")
const fetch = require("node-fetch")

/* GET home page. */


router.get('/',  isloged, async(req, res, next) =>{

    const apiRickYMorty = async()=>{

        const getDatos = await fetch("https://rickandmortyapi.com/api/character/1,183")
                                    .then(res => res.json())
                                    .then(resp => {
                                        console.log(resp)
                                    })
    
    
    }



});

module.exports = router