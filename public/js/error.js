//changing the time on view
var timeValue = document.getElementById('timeLeft') 
var time = 10
var interval = setInterval(() => {
    if(time === 0){
        clearInterval(interval)
        window.location = "/"
    }else{
        timeValue.textContent = `${time--} seconds`
    }
}, 1000);
