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
    }else{
        window.location = 'dashboard.html'
    }
})

function redMarked(){
    const inputUser = document.querySelector("#username")
    const inputPwd = document.querySelector("#password")
    
    inputUser.setAttribute('style',`border:1px solid ${username === "" ? "red" : "blue"}`)
    inputPwd.setAttribute('style',`border:1px solid ${password === "" ? "red" : "blue"}`)
}