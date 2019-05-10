document.querySelector('.search_box').addEventListener('keyup',function(){
    const search_box = this.value.trim()
    if(search_box !== ""){
        const father = document.querySelector('.container-lists').children
        for (const child of father) {
            const element = child.id
            if(element === "" || element === "add") continue
            
        }
        
    }
})