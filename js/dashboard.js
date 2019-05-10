const children = [], states = []
const father = document.querySelector('#lists')
function getChildren() {
    for (const kid of father.children) {
        children.push(kid)   
        states.push("on")
    }
}
getChildren()

document.querySelector('.search_box').addEventListener('keyup',function(key){
    const search_box = this.value.trim()
    if(search_box !== ""){
        for (let i = 0; i < children.length; i++) {
            var pattern = ""
            for (const char of search_box) {
                pattern += `[${char}]{1}`
            }

            var exp = new RegExp(pattern)
            match = exp.test(children[i].id)
            if(!match){
                if(states[i] === "on"){
                    states[i] = "off"
                    document.getElementById(children[i].id).remove()
                }
            }else{
                if(states[i] === "off"){
                    father.appendChild(children[i])
                }
            }
        }
    }else{
        for (let i = 0; i < children.length; i++) {
            if(states[i] === "off"){
                father.appendChild(children[i])
            }
        }
    }
})