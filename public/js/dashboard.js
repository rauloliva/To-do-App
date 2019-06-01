//Lists's chldren and their states
//On: appers on the DOM 
//Off: doesn't appear in the DOM
const children = [], states = []
const father = document.querySelector('#lists')

function getChildren() {
    for (const kid of father.children) {
        children.push(kid)   
        states.push("on")
    }
}
//Getting the div#lists children into the array
getChildren()

document.querySelector('.search_box').addEventListener('keyup',function(){
    const search_box = this.value.trim().replace(' ','-')
    if(search_box !== ""){
        for (let i = 0; i < children.length; i++) {
            //forming the pattern in order to get a match 
            var pattern = ""
            for (const char of search_box) {
                pattern += `[${char}]{1}`
            }
            
            var exp = new RegExp(pattern)
            match = exp.test(children[i].id)
            if(match){
                if(states[i] === "off"){
                    father.appendChild(children[i])
                    states[i] = "on"
                }
            }else{
                if(states[i] === "on"){
                    document.getElementById(children[i].id).remove()
                    states[i] = "off"
                }
            }
        }
    }else{
        for (let i = 0; i < children.length; i++) {
            if(states[i] === "off"){
                father.appendChild(children[i])
                states[i] = "on"
            }
        }
    }
})