document.querySelector('#select_photo').addEventListener('change',function(){
    document.querySelector('#photo').src = (window.URL ? URL : webkitURL).createObjectURL(this.files[0]);
})
