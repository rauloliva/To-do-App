document.querySelector('#select_photo').addEventListener('change',function(){
    
    const filetype = this.files[0].type
    switch(filetype){
        case "image/jpeg":
        case "image/jpg":
        case "image/png":
        case "image/gif":
            document.querySelector('#photo').src = (window.URL ? URL : webkitURL).createObjectURL(this.files[0]);
            break
        default: 
            fileNotValid()
    }
})

function fileNotValid(){
    document.getElementById('title-modal').textContent = "Not a valid format"
    document.getElementById('body-modal').innerHTML = "The file you selected is not an image"
    $('#incorrect_file_format').modal('show')
}