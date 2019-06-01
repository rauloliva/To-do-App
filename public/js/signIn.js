var username = ""
var password = ""
var email = ""
var birthday = ""

//validate the fields
document.querySelector('#signin').addEventListener('click',function(){
    username = document.querySelector('#username').value
    password = document.querySelector('#password').value
    email = document.querySelector('#email').value
    birthday = document.querySelector('#birthday').value
    
    if (username === '' || password === "" || email === "" || birthday === "") {
        var title = "Form Incomplete"
        var body = "There's no enough informartion to continue<br>the fields are marked with red"
        var modal = new Modal_Content(title,body)
        modal.setTexts()
        
        $('#empty_fields').modal('show')
        redMarked()
    }else{
        window.location = "log_in.html"
    }
})

function redMarked(){
    const inputUser = document.querySelector("#username")
    const inputPwd = document.querySelector("#password")
    const inputEmail = document.querySelector("#email")
    const inputBirth = document.querySelector("#birthday")
    
    inputUser.setAttribute('style',`border:1px solid ${username === "" ? "red" : "blue"}`)
    inputPwd.setAttribute('style',`border:1px solid ${password === "" ? "red" : "blue"}`)
    inputEmail.setAttribute('style',`border:1px solid ${email === "" ? "red" : "blue"}`)
    inputBirth.setAttribute('style',`border:1px solid ${birthday === "" ? "red" : "blue"}`)
}