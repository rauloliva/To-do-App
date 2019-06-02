//Creating the server
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
//Database
var DatabBase = require('./public/js/db')
var db = new DatabBase()
var port = 3000

app.listen(port,function(){
    console.log(`Server started at port ${port}`);
})

//setting the public folder as a view
app.set('views','public')
//setting the engine
app.set('view engine','jade')
//preparing the html body to be parsed as json when a form is sent 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))

//Setting a midleware session
app.use(session({secret:"Idk"}))

//Log In page
app.get('/',function(req,res){
    req.session.destroy(function(err){
        if(err) throw err
        res.render('log_in')
    })
})

app.post('/log_in',function(req,res){
    const username = req.body.username
    const pwd = req.body.password
    var user = {
        username: username,
        pwd: pwd
    }
    db.Select(user,function(objData){
        if(objData !== null && objData !== undefined){
            req.session.Id = objData.id_user
            req.session.photo = objData.photo
            res.redirect(301,'/dashboard') 
        }else{
            res.render('log_in',{message: "Username or Password Incorrect"})
        }
    })
})

//dashboard page
app.get('/dashboard',function(req,res){
    console.log(req.session.Id)
    if(req.session.Id){
        res.render('dashboard')
    }else{
        res.write('<h1>You are not logged in</h1>')
        res.end("yeah")
    }
})

