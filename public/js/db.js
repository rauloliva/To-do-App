var mysql = require('mysql')

var DataBase = function(){
    var sThis = this
    sThis.cnn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "raulito10",
        database: "to_do",
        port: "3306"  
    })

    var Insert = function(data){
        sThis.cnn.connect(function(err){
            if(err) throw err
            console.log("Connected to insert")
            var sql = "INSERT INTO users VALUES (1,'raul','rara','q@g.com','1997-09-27','Photo')"
            sThis.cnn.query(sql,function(err,result){
                if(err) throw err
                console.log("1 query inserted");
                console.log(result);
            })
        })
    }

    var Select = function(user, callback){
        console.log("Retrieving...")
        const sql = `SELECT * FROM users WHERE username = '${user.username}' AND password = '${user.pwd}'`
        sThis.cnn.query(sql,function(err,result){
            if(err) throw err
            var objData = null
            try {
                objData = result[0]
            } catch (error) {}
            callback(objData)
        })
    }

    var selectProfile = function(id, callback){
        console.log('Retrieving profile...')
        const sql = `SELECT * FROM users WHERE id_user = ${id}`
        sThis.cnn.query(sql,function(err,result){
            if(err) throw err
            var profile = null
            try {
                profile = result[0]
            } catch (error) {}
            callback(profile)
        })
    }

    var update = function(data, callback){
        console.log('Updating profile...')
        const sql = `UPDATE users SET username = '${data.username}', password = '${data.password}', 
            email = '${data.email}', birthday = '${data.birthday}', photo = '${data.photo}' 
            WHERE id_user = ${data.id}`
        sThis.cnn.query(sql,function(err){
            if(err) throw err
            callback()
        })
    }

    return {
        Insert: Insert,
        Select: Select,
        selectProfile: selectProfile,
        update: update
    }
}
module.exports = DataBase