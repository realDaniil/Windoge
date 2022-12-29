//document.querySelector('.task-bar-btn-holder').style.left = window.outerWidth - document.querySelector('.task-bar-btn-holder').offsetWidth + 'px';
//document.querySelector('#task-bar').style.width = window.outerWidth - document.querySelector('.task-bar-btn-holder').offsetWidth - document.querySelector('.task-bar-search-holder').offsetWidth - document.querySelector('.start-holder').offsetWidth + 'px';
window.onload = ()=> {
document.querySelector('.loading-section').style.display = 'none';
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    document.querySelector('.error-screen-secton').style.display = 'block';
}


let tickMessage = 0;
messageInterval = setInterval(function(){
    tickMessage++;
    if(tickMessage === 30){
        document.querySelector('#new-message-indicator').style.display = 'block';
        document.querySelector('#area-message').innerHTML = `<p>If you find a bug, then everything is as intended)</p>`;
        document.querySelector('#area-message').innerHTML += `<p>Press the W key</p>`;
        document.querySelector('.message-task-bar').innerHTML += `<button class="del-messages-btn">Delete all messages</button>`;
        clearInterval(messageInterval);
    }
}, 1000);

window.addEventListener("contextmenu", e => e.preventDefault());
let contextmenu = document.getElementById('contextmenu');
let targetContextmenu;
let alignmentContextmenuX, alignmentContextmenuY;

document.addEventListener('contextmenu', (event) =>{
    contextmenu.style.display='block';
    contextmenu.style.left = event.pageX + 'px';
    contextmenu.style.top = event.pageY + 'px';
    alignmentContextmenuY = event.pageY + contextmenu.offsetHeight - window.innerHeight;
    alignmentContextmenuX = event.pageX + contextmenu.offsetWidth - window.innerWidth;
    if (window.innerHeight < event.pageY + contextmenu.offsetHeight){
        contextmenu.style.top = event.pageY - alignmentContextmenuY + 'px';
    }
    if(event.pageY < 0){
        contextmenu.style.top = 0 + 'px';
    }
    if (window.innerWidth < event.pageX + contextmenu.offsetWidth){
        contextmenu.style.left = event.pageX - alignmentContextmenuX + 'px';
    }
    if(event.target.closest('#calculator')){
        targetContextmenu = document.querySelector('.calc-number').textContent;
        console.log(targetContextmenu)
    }
});

contextmenu.addEventListener('mousedown', (e)=>{
    if(e.target.closest('#c-btn-personalization')){
        console.log('c-btn-personalization');
    }
    if(e.target.closest('#c-btn-create')){
        console.log('c-btn-create');
    }
    if(e.target.closest('#c-btn-paste')){
        console.log('c-btn-paste');
    }
    if(e.target.closest('#c-btn-copy')){
        console.log('c-btn-copy');
        navigator.clipboard.writeText(targetContextmenu);
    }
});


document.addEventListener('mousedown', ()=>{
    contextmenu.style.display='none';
});


//канвас
let mainCanvas = document.getElementById('canvas');
let ctx = mainCanvas.getContext('2d');
mainCanvas.width = window.screen.width;
mainCanvas.height = window.screen.height;
ctx.fillStyle = 'rgba(5, 5, 160, 0.6)';
let canvasInterval;
let xCanvas, yCanvas, wCanvas, hCanvas;
mainCanvas.addEventListener('mousedown', canvasFunction);
function getCoordinateFunction(a, b){
    if(wCanvas<0 && hCanvas>=0){
        if (
            a.x < xCanvas + wCanvas*-1 &&
            a.x + a.width > xCanvas-wCanvas*-1 &&
            a.y < yCanvas + hCanvas &&
            a.height + a.y > yCanvas
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if(hCanvas<0 && wCanvas>=0){
        if (
            a.x < xCanvas + wCanvas &&
            a.x + a.width > xCanvas &&
            a.y < yCanvas + hCanvas*-1 &&
            a.height + a.y > yCanvas-hCanvas*-1
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if(hCanvas<0 && wCanvas<0){
        if (
            a.x < xCanvas + wCanvas*-1 &&
            a.x + a.width > xCanvas-wCanvas*-1 &&
            a.y < yCanvas + hCanvas*-1 &&
            a.height + a.y > yCanvas + hCanvas
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if(hCanvas>0 && wCanvas>0){
        if(
            a.x < xCanvas + wCanvas &&
            a.x + a.width > xCanvas &&
            a.y < yCanvas + hCanvas &&
            a.height + a.y > yCanvas
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    } else {
        b.style.backgroundColor = 'transparent';
        b.style.border = 'solid 2px transparent';
    }
    //а ладно потом сделаю возможно
}
function canvasFunction(e){
    mainCanvas.style.zIndex = 100;
    xCanvas = e.x;
    yCanvas = e.y;
    canvasInterval = setInterval(function () {
        ctx.clearRect(0, 0, window.screen.width, window.screen.height);
        ctx.fillRect(xCanvas, yCanvas, wCanvas, hCanvas);
        ctx.strokeRect(xCanvas, yCanvas, wCanvas, hCanvas);
        // let appSup = document.getElementById('computer-logo').getBoundingClientRect();
        
        getCoordinateFunction(document.getElementById('notes-logo').getBoundingClientRect(), document.getElementById('notes-logo'));
        getCoordinateFunction(document.getElementById('computer-logo').getBoundingClientRect(), document.getElementById('computer-logo'));
        getCoordinateFunction(document.getElementById('calculator-logo').getBoundingClientRect(), document.getElementById('calculator-logo'));
        getCoordinateFunction(document.getElementById('paint-logo').getBoundingClientRect(), document.getElementById('paint-logo'));

//Потом доделаю 

},1);
}
window.addEventListener("mousemove", function (e){
    wCanvas = e.x - xCanvas;
    hCanvas = e.y - yCanvas;

});
window.addEventListener('mouseup', function (){
    mainCanvas.style.zIndex = 0;
    clearInterval(canvasInterval);
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    xCanvas=undefined; yCanvas=undefined; wCanvas=undefined; hCanvas=undefined;
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
            document.querySelector('.calendar-day31').style.display = 'none';
        }
        if (month === 12){
            month = 'December';
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
    document.querySelector('audio').play();
    clearInterval(timerInterval);
}}


function showUpFunction(e){
    document.querySelector(e).style.bottom=document.querySelector('footer').offsetHeight + 'px';
    document.querySelector('.blackBackground').style.zIndex='700';
    document.querySelector('.blackBackground').style.backgroundColor='rgba(0, 0, 0, 0.8)';
}
function hideFunction(e){
    document.querySelector(e).style.bottom= -610 + 'px';
    document.querySelector('.blackBackground').style.zIndex='-10';
    document.querySelector('.blackBackground').style.backgroundColor='rgba(0, 0, 0, 0)';
}
let openTime = false, openStart = false, openMessage = false;
//специальные клавиши
document.addEventListener('keydown', (e)=>{
    hideFunction('.time');
    hideFunction('.message-task-bar');
    openTime = false, openMessage = false;
    if(e.code == 'KeyW'){
        if(openStart === true){
            openStart = false;
            hideFunction('.start-menu');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
        }
        else if(openStart === false){
            openStart = true;
            showUpFunction('.start-menu');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
        }
    }
});
//обработчик нажатий
document.addEventListener('click', (e)=>{
    hideFunction('.time');
    hideFunction('.message-task-bar');
    hideFunction('.start-menu');
    document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
    if(e.target.closest('.start-menu-btn')){
        openStart = false;
        hideFunction('.start-holder');
        document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
        return;
    }
    if(e.target.closest('.start-holder')){
        if(openStart === true){
            openStart = false;
            hideFunction('.start-holder');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
        }
        else if(openStart === false){
            openStart = true;
            showUpFunction('.start-menu');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
        }
    }
    if(e.target.closest('.start-menu')){
        openStart = true;
        showUpFunction('.start-menu');
        document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
    }
    if(!e.target.closest('.start-holder') && !e.target.closest('.start-menu')){
        openStart = false;
    }

    if(e.target.closest('.lil-time-holder')){
        if(openTime === true){
            openTime = false;
            hideFunction('.time');
        }
        else if(openTime === false){
            openTime = true;
            showUpFunction('.time');
        }
    }
    if(e.target.closest('.time')){
        showUpFunction('.time');
        openTime = true;
    }
    if(!e.target.closest('.lil-time-holder') && !e.target.closest('.time')){
        openTime = false;
    }

    if(e.target.closest('.message-task-bar-icon')){
        if(openMessage === true){
            openMessage = false;
            hideFunction('.message-task-bar');
        }
        else if(openMessage === false){
            openMessage = true;
            showUpFunction('.message-task-bar');
        }
    }
    if(e.target.closest('.message-task-bar')){
        showUpFunction('.message-task-bar');
        openMessage = true;
    }
    if(!e.target.closest('.message-task-bar-icon') && !e.target.closest('.message-task-bar')){
        openMessage = false;
    }
    //выкл пк
    if(e.target.closest('#shutdown-start-btn')){
        let errorTick = 0;
        errorTickInterval = setInterval(function(){
            console.log('ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR');
            errorTick++;
            if(errorTick === 10){
            location.reload();
            clearInterval(errorTickInterval);
            }
        }, 1000);
        document.querySelector('body').style.backgroundColor = 'rgb(35, 105, 180)';
        document.querySelector('body').innerHTML = `<img style="width: 100vw; height: 100vh;" src="./img/blue-screen-of-death.png">`;
    }
    //сообщения
    if(e.target.closest('.del-messages-btn')){
        openMessage = false;
        document.querySelector('#area-message').innerHTML = `<p>No messages yet</p>`;
        document.querySelector('.del-messages-btn').style.display = 'none';
        document.querySelector('#new-message-indicator').style.display = 'none';
        hideFunction('.message-task-bar');
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