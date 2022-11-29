if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    document.querySelector('.error-screen-secton').style.display = 'block';
}


window.addEventListener("contextmenu", e => e.preventDefault());
let contextmenu = document.getElementById('contextmenu');
let alignmentX, alignmentY;
document.addEventListener('contextmenu', (event) =>{
    contextmenu.style.display='block';
    contextmenu.style.left = event.pageX + 'px';
    contextmenu.style.top = event.pageY + 'px';
    alignmentY = event.pageY + contextmenu.offsetHeight - window.innerHeight;
    alignmentX = event.pageX + contextmenu.offsetWidth - window.innerWidth;
    if (window.innerHeight < event.pageY + contextmenu.offsetHeight){
        contextmenu.style.top = event.pageY - alignmentY + 'px';
    }
    if(event.pageY < 0){
        contextmenu.style.top = 0 + 'px';
    }
    if (window.innerWidth < event.pageX + contextmenu.offsetWidth){
        contextmenu.style.left = event.pageX - alignmentX + 'px';
    }
});
document.addEventListener('mousedown', function (){
    contextmenu.style.display='none';
});









//канвас
let mainCanvas = document.getElementById('canvas');
let ctx = mainCanvas.getContext('2d');
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
ctx.fillStyle = 'rgba(5, 5, 160,0.5)';
ctx.strokeStyle = 'black'
let canvasInterval;
let xCanvas, yCanvas, aCanvas, bCanvas;
mainCanvas.addEventListener('mousedown', function (e){
    xCanvas = e.x;
    yCanvas = e.y;
    ctx.fillRect(xCanvas, yCanvas, xCanvas-aCanvas, yCanvas-bCanvas)
    ctx.strokeRect(xCanvas, yCanvas, xCanvas-aCanvas ,yCanvas-bCanvas)
    canvasInterval = setInterval(function () {
        ctx.clearRect(0, 0, 10000, 10000);
        ctx.fillRect(xCanvas, yCanvas, aCanvas-xCanvas, bCanvas-yCanvas)
        ctx.strokeRect(xCanvas, yCanvas, aCanvas-xCanvas ,bCanvas-yCanvas)
    },1)
})
window.addEventListener("mousemove", function (e){
    aCanvas = e.x;
    bCanvas = e.y;
});
window.addEventListener('mouseup', function (){
    ctx.clearRect(0, 0, 10000, 10000);
    xCanvas=undefined; yCanvas=undefined; aCanvas=undefined; bCanvas=undefined;
    clearInterval(canvasInterval)
});







// дата и время
let year,month,numMonth,date,numDate,day,hour,minutes,seconds;
timeSettings();
function timeSettings(){
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    numMonth = new Date().getMonth() + 1;
        if (month === 1){
            month = 'January';
        }
        if (month === 2){
            month = 'February';
            document.querySelector('.calendar-day29').style.display = 'none';
            document.querySelector('.calendar-day30').style.display = 'none';
            document.querySelector('.calendar-day31').style.display = 'none';
        }
        if (month === 3){
            month = 'March';            
        }
        if (month === 4){
            month = 'April';
            document.querySelector('.calendar-day31').style.display = 'none';        
        }
        if (month === 5){
            month = 'May';
            
        }
        if (month === 6){
            month = 'June';
            document.querySelector('.calendar-day31').style.display = 'none';
        }
        if (month === 7){
            month ='July';            
        }
        if (month === 8){
            month = 'August';            
        }
        if (month === 9){
            month = 'September';
            document.querySelector('.calendar-day31').style.display = 'none';
        }
        if (month === 10){
            month = 'October';            
        }
        if (month === 11){
            month = 'November';
        }
        if (month === 12){
            month = 'December';
            document.querySelector('.calendar-day31').style.display = 'none';
        }
    date = new Date().getDate();
    numDate = new Date().getDate(); 
    day = new Date().getDay();
        if (day = 0){
            day = 'Sunday';
        }
        else if (day = 1){
            day = "Monday";
        }
        else if (day = 2){
            day = "Tuesday";
        }
        else if (day = 3){
            day = "Wednesday";
        }
        else if (day = 4){
            day = "Thursday";
        }
        else if (day = 5){
            day = "Friday";
        }
        else if (day = 6){
            day = "Saturday";
        }
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
    if (seconds<10){
        seconds = '0'+seconds;
    }
    if (minutes<10){
        minutes = '0'+minutes;
    }
    if (hour<10){
        hour = '0'+hour;
    }
    if (date<10){
        date = '0'+date;
    }
    document.querySelector('.lil-time').innerHTML = hour + ':' + minutes;
    document.querySelector('.lil-date').innerHTML = date+'.'+numMonth+'.'+year;
    document.querySelector('.big-time').innerHTML = hour + ':' + minutes + ':' + seconds;
    document.querySelector('.big-date').innerHTML = date + ' '+ month + ' '+ year;
    document.querySelector('.calendar-day'+numDate).style.outline= '2px white solid';
    document.querySelector('.calendar-day'+numDate).style.fontWeight = '500';
    document.querySelector('.calendar-day'+numDate).style.textShadow = '0 0 2px white';
}
setInterval(timeSettings,100);






//секундамер 
document.querySelector('.stopwatch-numbers').innerHTML = '00:00,00';
let lapSaction = document.querySelector('.lap-saction');
let lapP, stopwatchInterval, lapInterval, lapNumArray;
let ms = 00, sec = 00, min = 00, msLap = 00, secLap = 00, minLap = 00;
function stopwatchFunction(){
    ms++;
    if(ms === 99){
        ms=00;
        sec++;
        if(sec === 59){
            sec=00;
            min++;
            if(min === 59){
                ms = 00;
                sec = 00;
                min = 00;
                clearInterval(stopwatchInterval);
            }
        }
    }
addNumStopwatch();
}
function lapFunction(){
    msLap++;
    if(msLap === 99){
        msLap=00;
        secLap++;
        if(secLap === 59){
            secLap=00;
            minLap++;
            if(minLap === 59){
                msLap = 00;
                secLap = 00;
                minLap = 00;
                clearInterval(lapInterval);
            }
        }
    }
}
function addNumStopwatch(){
    document.querySelector('.stopwatch-numbers').innerHTML = (min > 9 ? min : '0' + min) +':'+ (sec > 9 ? sec : '0' + sec) +','+ (ms > 9 ? ms : '0' + ms);
}


//timer 
let timerInterval;
let timerMin = document.querySelector('.timer-min');
let timerSec = document.querySelector('.timer-sec');
timerMin.addEventListener('input', ()=>{
    if(timerMin.value>60){
        timerMin.value = 60;
    }
    if(timerMin.value<0){
        timerMin.value = 0;
    }
    timerMin.value = timerMin.value.replace(/[+,-]/g, '');
});
timerMin.addEventListener('change', ()=>{
    if(timerMin.value === ''){
        timerMin.value = 0;
    }
});
timerSec.addEventListener('input', ()=>{
    if(timerSec.value>59){
        timerSec.value = 59;
    }
    if(timerSec.value<0){
        timerSec.value = 0;
    }
    timerSec.value = timerSec.value.replace(/[+,-]/g, '');
});
timerSec.addEventListener('change', ()=>{
    if(timerSec.value === ''){
        timerSec.value = 0;
    }
});



function timerFunction(){
    timerSec.value--;
    if(timerSec.value<0){
        timerSec.value = 59;
        timerMin.value--;
    }
if(timerMin.value<0){
    document.querySelector('.start-timer').style.display = 'block';
    document.querySelector('.stop-timer').style.display = 'none';
    document.querySelector('.dont-click-timer').style.display = 'none';
    document.querySelector('.reset-timer').style.display = 'none';
    timerMin.value = 0;
    timerSec.value = 30;
    document.querySelector('audio').play()
    clearInterval(timerInterval);
}
}



//обработчик нажатий в времени
let openTime = false;
document.addEventListener('click', (e)=>{
    //нажатие на время
    if(e.target.closest('.lil-time-holder') && openTime === true){
        document.querySelector('.time').style.bottom= -610 + 'px';
        document.querySelector('.blackBackground').style.zIndex='-10';
        document.querySelector('.blackBackground').style.backgroundColor='rgba(0, 0, 0, 0)';
        openTime = false;
    }
    else if(e.target.closest('.lil-time-holder')){
        document.querySelector('.time').style.bottom=document.querySelector('footer').offsetHeight + 'px';
        document.querySelector('.blackBackground').style.zIndex='50';
        document.querySelector('.blackBackground').style.backgroundColor='rgba(0, 0, 0, 0.8)';
        openTime = true;
    }
    else if(!e.target.closest('.time')){
        document.querySelector('.time').style.bottom= -610 + 'px';
        document.querySelector('.blackBackground').style.zIndex='-10'
        document.querySelector('.blackBackground').style.backgroundColor='rgba(0, 0, 0, 0)';
        openTime = false;
    }
    //кнопки таймера и его кента
    if(e.target.closest('.stopwatch-holder')){
        document.querySelector('.stopwatch').style.display = 'block';
        document.querySelector('.timer').style.display = 'none';
        document.querySelector('.timer-holder').classList.remove('stopwatch-and-timer-properties');
        document.querySelector('.stopwatch-holder').classList.add('stopwatch-and-timer-properties');
    }
    if(e.target.closest('.timer-holder')){
        document.querySelector('.timer').style.display = 'block';
        document.querySelector('.stopwatch').style.display = 'none';
        document.querySelector('.stopwatch-holder').classList.remove('stopwatch-and-timer-properties');
        document.querySelector('.timer-holder').classList.add('stopwatch-and-timer-properties');
    }
    if(e.target.closest('.start-stopwatch')){
        document.querySelector('.start-stopwatch').style.display='none';
        document.querySelector('.pause-stopwatch').style.display='block';
        document.querySelector('.reset-stopwatch').style.display='none';
        document.querySelector('.lap-stopwatch').style.display='block';
        stopwatchInterval = setInterval(stopwatchFunction, 10);
        lapInterval = setInterval(lapFunction, 10);
    }
    if(e.target.closest('.pause-stopwatch')){
        document.querySelector('.pause-stopwatch').style.display='none';
        document.querySelector('.start-stopwatch').style.display='block';
        document.querySelector('.lap-stopwatch').style.display='none';
        document.querySelector('.reset-stopwatch').style.display='block';
        clearInterval(stopwatchInterval);
        clearInterval(lapInterval);
    }
    if(e.target.closest('.reset-stopwatch')){
        ms = 00, sec = 00, min = 00, msLap = 00, secLap = 00, minLap = 00;
        addNumStopwatch();
        while (lapSaction.firstChild) {
        lapSaction.removeChild(lapSaction.firstChild);
        }
    }
    if(e.target.closest('.lap-stopwatch')){
        if(document.querySelector('.stopwatch-numbers').innerHTML !== '00:00,00'){
            lapNumArray = (minLap > 9 ? minLap : '0' + minLap) +':'+ (secLap > 9 ? secLap : '0' + secLap) +','+ (msLap > 9 ? msLap : '0' + msLap);
            lapP = document.createElement('p');
            lapP.className = 'lap-content';
            lapP.innerHTML = lapNumArray;
            lapSaction.append(lapP);
        }
        msLap = 00, secLap = 00, minLap = 00;
    }
    if(e.target.closest('.start-timer')){
        document.querySelector('.stop-timer').style.display = 'block';
        document.querySelector('.start-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'block';
        document.querySelector('.reset-timer').style.display = 'block';
        timerInterval = setInterval(timerFunction, 1000);
    }
    if(e.target.closest('.stop-timer')){
        document.querySelector('.start-timer').style.display = 'block';
        document.querySelector('.stop-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'block';
        clearInterval(timerInterval);
    }
    if(e.target.closest('.reset-timer')){
        document.querySelector('.start-timer').style.display = 'block';
        document.querySelector('.stop-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'none';
        document.querySelector('.reset-timer').style.display = 'none';
        document.querySelector('.timer-min').value = 0;
        document.querySelector('.timer-sec').value = 30;
        clearInterval(timerInterval);
    }
});








