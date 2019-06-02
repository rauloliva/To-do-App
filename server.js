//Creating the server
var express = require('express')
var app = express()
var port = 3000
var bodyParser = require('body-parser')
var session = require('express-session')
//Database
var DatabBase = require('./public/js/db')
var db = new DatabBase()
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

const msg_404 = "Sorry but we could not find any page that\n matches your criteria"
const msg_not_LoggedIn = "Sorry but you need to be logged-in, in order to use the site"

//Log In page
app.get('/',function(req,res){
    res.render('log_in')
})

app.post('/log_in',function(req,res){
    var user = {
        username: req.body.username,
        pwd: req.body.password
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
    if(req.session.Id){
        res.render('dashboard')
    }else{
        res.render('error',{
            title: "You are not logged in",
            message: msg_not_LoggedIn
        })
    }
})

//create list page
app.get('/create_list',function(req,res){
    if(req.session.Id){
        const name_list = req.query.list
        if(name_list === undefined){
            res.render('error',{
                title: "The request was not written well",
                message: "An error occured while attempting to load the page"
            })
        }
        res.render('create_list',{name_list: name_list})
    }else{
        res.render('error',{
            title: "You are not logged in",
            message: msg_not_LoggedIn
        })
    }
})

//Log out
app.get('/log_out',function(req,res){
    if(req.session.Id){
        req.session.destroy(function(err){
            if(err) throw err
        })
        res.render('log_in')
    }
})

//Not found page
app.use(function(req,res,next){
    res.render('error',{
        title: "Page Not Found: Error 404",
        message: msg_404
    })
})