const text_input = document.querySelector('#task')
var color = "#000" 
var font = "Lucida Sans"
var size = 20
var styles = {
    "font-weight": "normal",
    "font-style": "normal"
}
var num_task = 0

//event on input color
document.querySelector('#color_selector').addEventListener('change',function(){
    color = this.value
    text_input.setAttribute('style',`color:${color};font-family:${font};font-size:${size}px;
        font-weight:${styles["font-weight"]};font-style:${styles["font-style"]};width:75%`)
})
//event on select font
document.querySelector('#cmb_font').addEventListener('change',function(){
    font = this.value
    text_input.setAttribute('style',`color:${color};font-family:${font};font-size:${size}px;
        font-weight:${styles["font-weight"]};font-style:${styles["font-style"]};width:75%`)
})
//event on spinner font size
document.querySelector('#font_size').addEventListener('change',function(){
    size = this.value
    text_input.setAttribute('style',`color:${color};font-family:${font};font-size:${size}px;
        font-weight:${styles["font-weight"]};font-style:${styles["font-style"]};width:75%`)
})
//event on checkboxes
var checkboxes = document.querySelectorAll('input[type=checkbox]')
checkboxes.forEach( checkbox =>{
    checkbox.addEventListener('click',function(){
        var status = this.checked
        var value = this.value
        if(status){
            if(value === "bold"){
                styles["font-weight"] = value
            }else{
                styles["font-style"] = value
            }
        }else{
            if(value === "bold"){
                styles["font-weight"] = "normal"
            }else {
                styles["font-style"] = "normal"
            }
        }
        text_input.setAttribute('style',`color:${color};font-family:${font};font-size:${size}px;
            font-weight:${styles["font-weight"]};font-style:${styles["font-style"]};width:75%`)
    })
})

document.querySelector('#btn-add').addEventListener('click',function(){
    if(text_input.value.trim() !== ""){
        num_task++

        //create the cells
        var cell1 = document.createElement('td')
        var cell2 = document.createElement('td')
        cell2.setAttribute('id',`task_${num_task}`)
        var cell3 = document.createElement('td')

        //create the checkbox
        var checkbox = document.createElement('input')
        checkbox.setAttribute('id',`checkbox_${num_task}`)
        checkbox.setAttribute('type','checkbox')
        checkbox.setAttribute('style','width:30px;height:30px')
        checkbox.addEventListener('click',function(){
            const isChecked = this.checked
            const id = this.id.replace('checkbox_','')
            const task = document.querySelector(`#task_${id}`)
            task.innerHTML = isChecked ? `<s>${task.innerHTML}</s>` : `${task.textContent.replace('<s>','').replace('</s>','')}`
        })
        cell1.appendChild(checkbox)

        //create the task
        var text = document.createTextNode(text_input.value)
        cell2.setAttribute('style',`color:${color};font-family:${font};font-size:${size}px;
            font-weight:${styles["font-weight"]};font-style:${styles["font-style"]};width:75%`)
        cell2.appendChild(text)

        //create the delete button
        var button = document.createElement('button')
        button.setAttribute('id',`btn_delete_${num_task}`)
        button.addEventListener('click',function(){
            const id = this.id.replace('btn_delete_','')
            document.querySelector(`#row_${id}`).remove()
        })
        text = document.createTextNode('Delete')
        button.appendChild(text)
        cell3.appendChild(button)

        //adding the cells into the row
        var tr = document.createElement('tr')
        tr.setAttribute('id',`row_${num_task}`)
        tr.appendChild(cell1)
        tr.appendChild(cell2)
        tr.appendChild(cell3)

        //adding the row into the table
        var table = document.querySelector('table')
        table.appendChild(tr)

        text_input.value = ""
    }
})
