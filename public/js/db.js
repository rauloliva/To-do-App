var mysql = require('mysql')

/*class DataBase{
    constructor(){
        this.cnn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "raulito10",
            database: "to_do",
            port: "3306"  
        })
        this.cnn.connect(function(err){
            if(err) new Error(err)
            console.log("Connected")
            var sql = "INSERT INTO users (1,'raul','rara','q@g.com','1997-09-27','Photo')"
            this.query(sql,function(err,result){
                if(err) new Error(err)
                console.log(result);
            })
        })
    }
}*/

var DataBase = function(){
    var sThis = this
    sThis.cnn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "raulito10",
        database: "to_do",
        port: "3306"  
    })
    

    var Insert = function(){
        sThis.cnn.connect(function(err){
            if(err) throw err
            console.log("Connected")
            var sql = "INSERT INTO users VALUES (1,'raul','rara','q@g.com','1997-09-27','Photo')"
            sThis.cnn.query(sql,function(err,result){
                if(err) throw err
                console.log("1 query inserted");
                console.log(result);
            })
        })
    }

    return {
        Insert: Insert
    }
}
module.exports = DataBase