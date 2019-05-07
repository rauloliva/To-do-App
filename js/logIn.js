//on submit
document.querySelector("#login").addEventListener('click',function(){
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    if (username === "" || password === "") {
        var modal = new Modal_Content('Empty Fields','There are empty fields')
        modal.setTexts()
        $("#incorrect_passwords").modal('show')
    }else{
        window.location = 'dashboard.html'
    }
})