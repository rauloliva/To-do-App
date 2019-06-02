var username = ""
var password = ""

//on submit
document.querySelector("#login").addEventListener('click',function(){
    username = document.querySelector('#username').value
    password = document.querySelector('#password').value
    if (username === "" || password === "") {
        var modal = new Modal_Content('Empty Fields','There are empty fields')
        modal.setTexts()
        $("#incorrect_passwords").modal('show')
        redMarked()
    }
})

function redMarked(){
    const inputUser = document.querySelector("#username")
    const inputPwd = document.querySelector("#password")
    
    inputUser.setAttribute('style',`border:1px solid ${username === "" ? "red" : "blue"}`)
    inputPwd.setAttribute('style',`border:1px solid ${password === "" ? "red" : "blue"}`)
}

/*function verifyOnServer() {
    const username = document.getElementById('username').value
    const pwd = document.getElementById('password').value
    var http = new XMLHttpRequest()
    http.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            try {
                const json = JSON.parse(this.response)
                if(!json.flag){
                    alert('Incorrect Authentication')
                }
            } catch (error) {}
        }
    }
    http.open('GET',`/log_in?username=${username}&pwd=${pwd}`,true)
    http.send()
}*/