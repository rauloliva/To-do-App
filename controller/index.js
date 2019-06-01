var express = require('express')
var router = express.Router()

var DatabBase = require('../public/js/db')
var db = new DatabBase()

router.get('/',function(req,res){
    //db.Insert()
    res.render('log_in')
})

router.get('/log_in',function(req,res){
    const username = req.query.username
    const pwd = req.query.pwd
    console.log(`Data received: ${username} ${pwd}`);
    res.setHeader('Content-Type',"text/json")
    res.json({name: `Data received: ${username} ${pwd}`})
})

module.exports = router