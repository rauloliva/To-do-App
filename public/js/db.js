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

    var InsertTasks = function(id, tasks, status, listName, callback){
        console.log("Inserting tasks...")
        const date = new Date()
        var clientData = []
        let formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        tasks.forEach(async (task,i) => {

            //var s = typeof status[i] === 'undefined' ? "f" : status[i]
            //before insert, do an update for those that already exists in DB
            const wasUpdated = await updateTask(id,task,status[i])
            if(wasUpdated){
                console.log(task+" was updated");
            }else{
                console.log(task+" was not updated");
                var sql = `INSERT INTO lists (to_do,id_user,date_created,name_list,status) VALUES 
                    ('${task}',${id},'${formatted_date}','${listName}','${status[i]}')`    
                
                sThis.cnn.query(sql,err => {if(err) throw err})
            }
            clientData.push({
                to_do: task,
                status: status[i]
            }) 
            if((i+1) === tasks.length){
                callback(clientData)
            }
        })
    }

    var updateTask = function(id_user, task, status){
        return new Promise(resolve =>{
            const sql = `UPDATE lists SET status = '${status}' WHERE id_user = ${id_user} AND to_do = '${task}'`
            sThis.cnn.query(sql, function(err,result){
                if(err) throw err
                console.log("In Update: "+result.affectedRows);
                if(result.affectedRows > 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
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
    //retrieves all the tasks from a specific list
    var SelectList = function(id,name_list,callback){
        console.log("Retrieving tasks from list: "+name_list);
        const sql = `SELECT * FROM lists WHERE name_list = '${name_list}' AND id_user = ${id}`
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
        SelectList: SelectList,
        selectProfile: selectProfile,
        update: update,
        updateTask: updateTask
    }
}
module.exports = DataBase