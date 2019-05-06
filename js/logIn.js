//on submit
document.querySelector("#login").addEventListener('click',function(event){
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    if (username === "" || password === "") {
        var modal = new Modal_Content('Empty Fields','There are empty fields')
        modal.clearTexts()
        modal.setTexts()
        $("#incorrect_passwords").modal('show')
        event.preventDefault()    
    }else{
        window.location = 'dashboard.html'
    }
})