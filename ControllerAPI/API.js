var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.setHeader('Content-Type','application/json')
    res.json({
        name: "Juan perez",
        age: 23,
        birthday: "1995/06/20"
    })
})

module.exports = router