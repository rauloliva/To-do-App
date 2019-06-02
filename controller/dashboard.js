var express = require('express')
var router = express.Router()
var session = require('express-session')

var DatabBase = require('../public/js/db')
var db = new DatabBase()

router.use(session({secret:"Idk"}))

router.get('/',function(req,res){
    res.render('dashboard')
})

router.get('/dashboard',function(req,res){
    res.render('dashboard')
})

module.exports = router