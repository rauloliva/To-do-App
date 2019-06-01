//Creating the server
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = 3000
app.listen(port,function(){
    console.log(`Server started at port ${port}`);
})

//setting the public folder as a views
app.set('views','public')
//setting the engine
app.set('view engine','jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

app.get('/',function(req,res){
    res.render('index')
})