class Modal_Content{
    constructor(title,body,buttons=[],actions=[]){
        this.title = title
        this.body = body
        this.buttons = buttons
        this.actions = actions
        this.setTexts()
    }

    setTexts(){
        document.querySelector('#title-modal').textContent = this.title
        document.querySelector('#body-modal').innerHTML = this.body
    }

    setActions(){
        let lenActions = this.actions.length
        for (let i = 0; i < lenActions; i++) {
            const btn = document.createElement('button')
            const text = document.createTextNode(this.buttons[i])
            btn.appendChild(text)
            btn.addEventListener("click",this.actions[i])
            document.querySelector(".modal-footer").appendChild(btn)  
        }
    }

    clearTexts(){
        document.querySelector('#title-modal').textContent = ""
        document.querySelector('#body-modal').innerHTML = ""
    }
}