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

    var Insert = function(data,callback){
        console.log("Inserting...")
        var sql = `INSERT INTO users (username,password,email,birthday) VALUES 
            ('${data.username}','${data.pwd}','${data.email}','${data.birthday}')`
        sThis.cnn.query(sql,function(err){
            if(err) throw err
            callback()
        })
    }

    var InsertTasks = function(id, tasks, listName, callback){
        console.log("Inserting tasks...")
        var length = tasks.length
        const date = new Date()
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        for (let i = 0; i < length; i++) {
            var sql = `INSERT INTO lists (to_do,id_user,date_created,name_list) VALUES 
                ('${tasks[i]}',${id},'${formatted_date}','${listName}')`    
            sThis.cnn.query(sql,function(err){
                if(err) throw err
            })
        }
        callback()
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

    var SelectTasks = function(id_user, callback){
        console.log("Retrieving tasks");
        const sql = `SELECT DISTINCT(name_list) FROM lists WHERE id_user = ${id_user}`
        sThis.cnn.query(sql,function(err,result){
            if(err) throw err
            var objData = null
            try {
                objData = result
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
        InsertTasks: InsertTasks,
        Select: Select,
        SelectTasks: SelectTasks,
        selectProfile: selectProfile,
        update: update
    }
}
module.exports = DataBase