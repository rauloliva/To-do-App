//Creating the server
var express = require('express')
var app = express()
var port = 3000
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path')
//multer fucntions
var multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/photos/',
    filename: function(req,file,cb){    
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req,file,cb){
        //check file extension
        const fileTypes = /jpeg|jpg|png|gif/
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
        //chech MIME 
        const mimetype = fileTypes.test(file.mimetype)
        if(mimetype && extname){
            return cb(null,true)
        }else{
            cb('Error: Images only',false)
        }
    }
}).single('photo')

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

const error_404 = {
    title: "Page Not Found: Error 404",
    message: "Sorry but we could not find any page that\n matches your criteria" 
}
const error_session = {
    title: "You are not logged in",
    message: "Sorry but you need to be logged-in, in order to use the site"
}
//lack of parameters on url
const lack_data = {
    title: "The request was not written well",
    message: "An error occured while attempting to load the page"
}

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
        res.render('error',error_session)
    }
})

//create list page
app.get('/create_list',function(req,res){
    if(req.session.Id){
        const name_list = req.query.list
        if(name_list === undefined){
            res.render('error',lack_data)
        }else{
            res.render('create_list',{name_list: name_list})
        }
    }else{
        res.render('error',error_session)
    }
})

//Profile page
app.get('/profile',function(req,res){
    if(req.session.Id){
        db.selectProfile(req.session.Id,function(profile){
            var date = new Date(profile.birthday)
            let month = date.getMonth() + 1
            month = month <= 9 ? `0${month}` : month
            profile.birthday = `${date.getFullYear()}-${month}-${date.getDate()}`
            res.render('profile',profile)
        })
    }else{
        res.render('error',error_session)
    }
})

//when uploading profile's data
app.post('/profile',function(req,res){
    upload(req,res,(err) => {
        if(err) throw err

        const data = {
            id: req.session.Id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday,
            photo: req.file != undefined ? req.file.filename : req.session.photo
        }
        db.update(data,function(){
            res.render('profile',data)
        })
    })
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
app.use(function(req,res){
    res.render('error',error_404)
})