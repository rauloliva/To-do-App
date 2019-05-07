//validate the fields
document.querySelector('#signin').addEventListener('click',function(){
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const birthday = document.querySelector('#birthday').value
    if (username === '' || password === "" || email === "" || birthday === "") {
        var title = "Form Incomplete"
        var body = "There's no enough informartion<br>to continue"
        var modal = new Modal_Content(title,body)
        modal.setTexts()
        $('#empty_fields').modal('show')
    }else{
        window.location = "log_in.html"
    }
})