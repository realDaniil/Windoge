window.onload = () => {
    document.querySelector('.loading-section').style.display = 'none';
}
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    document.querySelector('.error-screen-secton').style.display = 'block';
}
console.log('The site may have problems when using macOS devices or when using the Firefox browser');
setInterval(() => {
    scroll(0, 0);
    document.querySelector('main').style.height = window.innerHeight - document.querySelector('footer').offsetHeight + 'px';
    document.querySelectorAll('.big-app').forEach((e) => { e.style.height = window.innerHeight - document.querySelector('footer').offsetHeight + 1 + 'px' });
    document.getElementById('video-camera').style.maxHeight = window.innerHeight - document.querySelector('footer').offsetHeight - 150 + 'px';
    document.querySelector('.notes-section').style.height = window.innerHeight - document.querySelector('.big-drag-holder').offsetHeight - document.querySelector('footer').offsetHeight + 'px';
}, 100);
let tickMessage = 0;
messageInterval = setInterval(function () {
    tickMessage++;
    if (tickMessage === 30) {
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

document.addEventListener('contextmenu', (event) => {
    contextmenu.style.display = 'block';
    contextmenu.style.left = event.pageX + 'px';
    contextmenu.style.top = event.pageY + 'px';
    alignmentContextmenuY = event.pageY + contextmenu.offsetHeight - window.innerHeight;
    alignmentContextmenuX = event.pageX + contextmenu.offsetWidth - window.innerWidth;
    if (window.innerHeight < event.pageY + contextmenu.offsetHeight) {
        contextmenu.style.top = event.pageY - alignmentContextmenuY + 'px';
    }
    if (event.pageY < 0) {
        contextmenu.style.top = 0 + 'px';
    }
    if (window.innerWidth < event.pageX + contextmenu.offsetWidth) {
        contextmenu.style.left = event.pageX - alignmentContextmenuX + 'px';
    }
    if (event.target.closest('#calculator')) {
        targetContextmenu = document.querySelector('.calc-number').textContent;
        console.log(targetContextmenu)
    }
});

contextmenu.addEventListener('mousedown', (e) => {
    if (e.target.closest('#c-btn-personalization')) {
        console.log('c-btn-personalization');
    }
    if (e.target.closest('#c-btn-create')) {
        console.log('c-btn-create');
    }
    if (e.target.closest('#c-btn-paste')) {
        console.log('c-btn-paste');
    }
    if (e.target.closest('#c-btn-copy')) {
        console.log('c-btn-copy');
        navigator.clipboard.writeText(targetContextmenu);
    }
});


document.addEventListener('mousedown', () => {
    contextmenu.style.display = 'none';
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
function getCoordinateFunction(a, b) {
    if (wCanvas <= 0 && hCanvas >= 0) {
        if (
            a.x < xCanvas + wCanvas * -1 &&
            a.x + a.width > xCanvas - wCanvas * -1 &&
            a.y < yCanvas + hCanvas &&
            a.height + a.y > yCanvas
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if (hCanvas <= 0 && wCanvas >= 0) {
        if (
            a.x < xCanvas + wCanvas &&
            a.x + a.width > xCanvas &&
            a.y < yCanvas + hCanvas * -1 &&
            a.height + a.y > yCanvas - hCanvas * -1
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if (hCanvas <= 0 && wCanvas <= 0) {
        if (
            a.x < xCanvas + wCanvas * -1 &&
            a.x + a.width > xCanvas - wCanvas * -1 &&
            a.y < yCanvas + hCanvas * -1 &&
            a.height + a.y > yCanvas + hCanvas
        ) {
            b.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
            b.style.border = 'solid 2px rgba(0, 0, 0, 0.7)';
        }
    }
    else if (hCanvas >= 0 && wCanvas >= 0) {
        if (
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
function canvasFunction(e) {
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

    }, 1);
}
window.addEventListener("mousemove", function (e) {
    wCanvas = e.x - xCanvas;
    hCanvas = e.y - yCanvas;
});
window.addEventListener('mouseup', function () {
    mainCanvas.style.zIndex = 0;
    clearInterval(canvasInterval);
    ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    xCanvas = undefined; yCanvas = undefined; wCanvas = undefined; hCanvas = undefined;
});




// дата и время
let year, month, numMonth, date, numDate, day, hour, minutes, seconds;
timeSettings();
function timeSettings() {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    numMonth = new Date().getMonth() + 1;
    if (month === 1) {
        month = 'January';
    }
    if (month === 2) {
        month = 'February';
        document.querySelector('.calendar-day29').style.display = 'none';
        document.querySelector('.calendar-day30').style.display = 'none';
        document.querySelector('.calendar-day31').style.display = 'none';
    }
    if (month === 3) {
        month = 'March';
    }
    if (month === 4) {
        month = 'April';
        document.querySelector('.calendar-day31').style.display = 'none';
    }
    if (month === 5) {
        month = 'May';

    }
    if (month === 6) {
        month = 'June';
        document.querySelector('.calendar-day31').style.display = 'none';
    }
    if (month === 7) {
        month = 'July';
    }
    if (month === 8) {
        month = 'August';
    }
    if (month === 9) {
        month = 'September';
        document.querySelector('.calendar-day31').style.display = 'none';
    }
    if (month === 10) {
        month = 'October';
    }
    if (month === 11) {
        month = 'November';
        document.querySelector('.calendar-day31').style.display = 'none';
    }
    if (month === 12) {
        month = 'December';
    }
    date = new Date().getDate();
    numDate = new Date().getDate();
    day = new Date().getDay();
    if (day = 0) {
        day = 'Sunday';
    }
    else if (day = 1) {
        day = "Monday";
    }
    else if (day = 2) {
        day = "Tuesday";
    }
    else if (day = 3) {
        day = "Wednesday";
    }
    else if (day = 4) {
        day = "Thursday";
    }
    else if (day = 5) {
        day = "Friday";
    }
    else if (day = 6) {
        day = "Saturday";
    }
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (date < 10) {
        date = '0' + date;
    }
    document.querySelector('.lil-time').innerHTML = hour + ':' + minutes;
    document.querySelector('.lil-date').innerHTML = date + '.' + numMonth + '.' + year;
    document.querySelector('.big-time').innerHTML = hour + ':' + minutes + ':' + seconds;
    document.querySelector('.big-date').innerHTML = date + ' ' + month + ' ' + year;
    document.querySelector('.calendar-day' + numDate).style.outline = '2px white solid';
    document.querySelector('.calendar-day' + numDate).style.fontWeight = '500';
    document.querySelector('.calendar-day' + numDate).style.textShadow = '0 0 2px white';
}
setInterval(timeSettings, 100);



//секундамер 
document.querySelector('.stopwatch-numbers').innerHTML = '00:00,00';
let lapSaction = document.querySelector('.lap-saction');
let lapP, stopwatchInterval, lapInterval, lapNumArray;
let ms = 00, sec = 00, min = 00, msLap = 00, secLap = 00, minLap = 00;
function stopwatchFunction() {
    ms++;
    if (ms === 99) {
        ms = 00;
        sec++;
        if (sec === 59) {
            sec = 00;
            min++;
            if (min === 59) {
                ms = 00;
                sec = 00;
                min = 00;
                clearInterval(stopwatchInterval);
            }
        }
    }
    addNumStopwatch();
}
function lapFunction() {
    msLap++;
    if (msLap === 99) {
        msLap = 00;
        secLap++;
        if (secLap === 59) {
            secLap = 00;
            minLap++;
            if (minLap === 59) {
                msLap = 00;
                secLap = 00;
                minLap = 00;
                clearInterval(lapInterval);
            }
        }
    }
}
function addNumStopwatch() {
    document.querySelector('.stopwatch-numbers').innerHTML = (min > 9 ? min : '0' + min) + ':' + (sec > 9 ? sec : '0' + sec) + ',' + (ms > 9 ? ms : '0' + ms);
}

//timer 
let timerInterval;
let timerMin = document.querySelector('.timer-min');
let timerSec = document.querySelector('.timer-sec');
timerMin.addEventListener('input', () => {
    if (timerMin.value > 60) {
        timerMin.value = 60;
    }
    if (timerMin.value < 0) {
        timerMin.value = 0;
    }
    timerMin.value = timerMin.value.replace(/[+,-]/g, '');
});
timerMin.addEventListener('change', () => {
    if (timerMin.value === '') {
        timerMin.value = 0;
    }
});
timerSec.addEventListener('input', () => {
    if (timerSec.value > 59) {
        timerSec.value = 59;
    }
    if (timerSec.value < 0) {
        timerSec.value = 0;
    }
    timerSec.value = timerSec.value.replace(/[+,-]/g, '');
});
timerSec.addEventListener('change', () => {
    if (timerSec.value === '') {
        timerSec.value = 0;
    }
});



function timerFunction() {
    timerSec.value--;
    if (timerSec.value < 0) {
        timerSec.value = 59;
        timerMin.value--;
    }
    if (timerMin.value < 0) {
        document.querySelector('.start-timer').style.display = 'block';
        document.querySelector('.stop-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'none';
        document.querySelector('.reset-timer').style.display = 'none';
        timerMin.value = 0;
        timerSec.value = 30;
        document.querySelector('audio').play();
        clearInterval(timerInterval);
    }
}


function showUpFunction(e) {
    document.querySelector(e).style.bottom = document.querySelector('footer').offsetHeight + 'px';
    document.querySelector('.blackBackground').style.zIndex = '700';
    document.querySelector('.blackBackground').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}
function hideFunction(e) {
    document.querySelector(e).style.bottom = -610 + 'px';
    document.querySelector('.blackBackground').style.zIndex = '-10';
    document.querySelector('.blackBackground').style.backgroundColor = 'rgba(0, 0, 0, 0)';
}
let openTime = false, openStart = false, openMessage = false, openShutdown = false;
let canvasVideo = document.querySelector('#video-canvas');
let bigVideoCanvas = document.querySelector('#big-video-canvas');
let videoContext = canvasVideo.getContext('2d');
let bigVideoContext = bigVideoCanvas.getContext('2d');
let videoCamera = document.querySelector('#video-camera');
let cameraOpen = false;
let changeCameraClick = 0;
let takePhotoClick = 0;
let cameraArray = [];
canvasVideo.style.borderRadius = '4px';
videoContext.fillStyle = 'black';
videoContext.fillRect(0, 0, canvasVideo.width, canvasVideo.height);
// bigVideoContext.fillStyle = 'rgb(31, 31, 31)';
// videoContext.fillRect(0, 0, canvasVideo.width, canvasVideo.height);
navigator.mediaDevices.enumerateDevices().then(function (devices) {
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].kind === 'videoinput') {
            cameraArray.push(devices[i]);
        }
    }
});
function cameraFunction() {
    if (cameraOpen === true) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: cameraArray[changeCameraClick] }).then(stream => {
                cameraArray = [];
                navigator.mediaDevices.enumerateDevices().then(function (devices) {
                    for (let i = 0; i < devices.length; i++) {
                        if (devices[i].kind === 'videoinput') {
                            cameraArray.push(devices[i]);
                        }
                    }
                });
                videoCamera.srcObject = stream;
            }).catch(err => {
                console.log(err);
            });
        }
    }
    if (cameraOpen === false) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            videoCamera.srcObject = stream;
            stream.getTracks().forEach(track => track.stop());
            console.log('The camera turns off with a delay');
        });
    }
}

function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};
let imagesSectionFiles = [];
let files = [];
let imagesSection = document.querySelector('.images-section');
let imgCanvas, sizeImgCanvas;
let xhr = new XMLHttpRequest();

function upload(selector, options = {}) {
    let inputImg = document.querySelector(selector);
    let btnAddImg = document.createElement('button');
    btnAddImg.classList.add('add-image-btn');
    btnAddImg.textContent = 'Add Image';
    inputImg.insertAdjacentElement('afterend', btnAddImg);
    if (options.multi) {
        inputImg.setAttribute('multiple', true);
    }
    if (options.accept && Array.isArray(options.accept)) {
        inputImg.setAttribute('accept', options.accept.join(','));
    }
    btnAddImg.addEventListener('click', () => {
        inputImg.click();
    });
    inputImg.addEventListener('change', (e) => {
        if (!e.target.files.length) {
            return;
        }
        files = Array.from(e.target.files);
        files.forEach(file => {
            if (!file.type.match('image')) {
                return;
            }
            let reader = new FileReader();
            reader.onload = (ev) => {
                console.log(file)
                if (imagesSectionFiles.includes(ev.target.result)) {
                    return;
                }
                document.querySelector('.dontHaveImg').style.display = 'none';
                imagesSection.style.justifyContent = 'flex-start';
                imagesSection.style.alignItems = 'flex-start';
                imagesSection.insertAdjacentHTML('afterbegin', `
                <div class="image-holder">
                    <div class="image-remove" data-name="${file.name}">&times;</div>
                    <img src="${ev.target.result}" alt="${file.name}" class="image">
                    <div class="image-info">
                        <span>${file.name}</span>
                        <span>${bytesToSize(file.size)}</span>
                    </div>
                </div>
                `);
                imagesSectionFiles.push(ev.target.result);
            }
            reader.readAsDataURL(file);
            inputImg.value = '';
        });
    });
    document.querySelector('.images-section').addEventListener('click', (e) => {
        if (!e.target.dataset.name) {
            return;
        }
        let name = e.target.dataset.name;
        imagesSectionFiles.splice(imagesSectionFiles.indexOf(e.target.closest('.image-holder').childNodes[3].src), 1);
        files = files.filter(file => file.name !== name);
        let block = imagesSection.querySelector(`[data-name="${name}"]`).closest('.image-holder');
        block.classList.add('removing');
        setTimeout(() => {
            block.remove();
            if (imagesSectionFiles == '') {
                document.querySelector('.dontHaveImg').style.display = 'block';
                imagesSection.style.justifyContent = 'center';
                imagesSection.style.alignItems = 'center';
            }
        }, 200);
    });
}

upload('#add-image', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg']
});
//прочее
let firstInputValue = null, secondInputValue = null;
document.querySelector('.search-input').addEventListener('input', (e) => {
    firstInputValue = document.querySelector('.search-input').value;
});
document.querySelector('.search-input').addEventListener('change', (e) => {
    secondInputValue = document.querySelector('.search-input').value;
});
//специальные клавиши
let zoomClickArray = [1, 1.25, 1.5, 1.75, 2];
let zoomClick = 0;
let imagesLeft = 0;
let notesApp = document.getElementById('notes');
document.addEventListener('keydown', (e) => {
    if (firstInputValue != secondInputValue || notesApp.style.display == 'block') {
        return;
    }
    else if (e.code == 'KeyW') {
        hideFunction('.message-task-bar');
        hideFunction('.time');
        openTime = false, openMessage = false;
        if (openStart === true) {
            openStart = false;
            hideFunction('.start-menu');
            document.querySelector('.shutdown-btns-holder').style.left = -250 + 'px';
            openShutdown = false;
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
        }
        else if (openStart === false) {
            openStart = true;
            showUpFunction('.start-menu');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
        }
    }
    if (e.code == 'Tab') {
        setTimeout(() => {
            scroll(0, 0);
        }, 1);
    }
    if (e.code == 'KeyZ' || e.code == 'ArrowUp' && document.querySelector('.backgroundImage').style.zIndex == '2000') {
        if (zoomClick > 3) {
            zoomClick = -1;
        }
        zoomClick++;
        document.querySelector('.openImage').style.transform = 'scale(' + zoomClickArray[zoomClick] + ')';
    }
    if (e.code == 'ArrowLeft' && document.querySelector('.backgroundImage').style.zIndex == '2000') {
        document.querySelector('.openImage').style.transform = 'scale(1)';
        imagesLeft = imagesSectionFiles.indexOf(document.querySelector('.openImage').src);
        imagesLeft++;
        if (imagesLeft == imagesSectionFiles.length) {
            imagesLeft = 0;
        }
        document.querySelector('.openImage').src = imagesSectionFiles[imagesLeft];
    }
    if (e.code == 'ArrowRight' && document.querySelector('.backgroundImage').style.zIndex == '2000') {
        document.querySelector('.openImage').style.transform = 'scale(1)';
        imagesLeft = imagesSectionFiles.indexOf(document.querySelector('.openImage').src);
        imagesLeft--;
        if (imagesLeft == -1) {
            imagesLeft = imagesSectionFiles.length - 1;
        }
        document.querySelector('.openImage').src = imagesSectionFiles[imagesLeft];
    }
    if (e.code == 'ArrowDown' && document.querySelector('.backgroundImage').style.zIndex == '2000') {
        if (zoomClick < 1) {
            zoomClick = 5;
        }
        zoomClick--;
        document.querySelector('.openImage').style.transform = 'scale(' + zoomClickArray[zoomClick] + ')';
    }
});
//обработчик нажатий
document.addEventListener('click', (e) => {
    hideFunction('.time');
    hideFunction('.message-task-bar');
    hideFunction('.start-menu');
    document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
    if (e.target.closest('.image-holder') && !e.target.closest('.image-remove')) {
        document.querySelector('.backgroundImage').style.zIndex = 2000;
        document.querySelector('.openImage').src = e.target.closest('.image-holder').childNodes[3].src;
    }
    if (e.target.closest('.backgroundImage')) {
        document.querySelector('.backgroundImage').style.zIndex = -10;
        document.querySelector('.openImage').style.transform = 'scale(1)';
        document.querySelector('.openImage').src = '';
        zoomClick = 0;
    }
    if (e.target.closest('#change-camera-btn')) {
        if (cameraArray.length <= 1) {
        } else {
            let deg = 0;
            let changeBtnTimer = setInterval(() => {
                deg = deg + 5;
                document.querySelector('#change-camera-btn').style.transform = 'rotate(' + deg + 'deg)';
                if (deg >= 360) {
                    clearInterval(changeBtnTimer);
                }
            }, 1);
            changeCameraClick++;
            if (changeCameraClick > cameraArray.length - 1) {
                changeCameraClick = 0;
                cameraFunction();
            }
            if (changeCameraClick < cameraArray.length) {
                cameraFunction();
            }
        }
    }
    if (e.target.closest('#take-photo-btn')) {
        bigVideoCanvas.width = videoCamera.clientWidth;
        bigVideoCanvas.height = videoCamera.clientHeight;
        bigVideoContext.drawImage(videoCamera, 0, 0, bigVideoCanvas.width, bigVideoCanvas.height);
        videoContext.drawImage(videoCamera, 0, 0, canvasVideo.width, canvasVideo.height);
        // imgCanvas = document.createElement('img');
        // imgCanvas.src = bigVideoCanvas.toDataURL("image/jpeg");
        xhr.open("GET", bigVideoCanvas.toDataURL("image/jpeg"), true);
        xhr.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                sizeImgCanvas = this.response.byteLength;
            }
        };
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        xhr.onload = () => {
            if (imagesSectionFiles.includes(bigVideoCanvas.toDataURL("image/jpeg"))) {
                return;
            }
            takePhotoClick++;
            document.querySelector('.dontHaveImg').style.display = 'none';
            imagesSection.insertAdjacentHTML('afterbegin', `
            <div class="image-holder">
                <div class="image-remove" data-name="${bigVideoCanvas.toDataURL("image/jpeg")}">&times;</div>
                <img src="${bigVideoCanvas.toDataURL("image/jpeg")}" class="image" alt="${bigVideoCanvas.toDataURL("image/jpeg")}" id="canvasImage${takePhotoClick}">
                <div class="image-info">
                    <span>image${takePhotoClick}.doge</span>
                    <span>${bytesToSize(sizeImgCanvas)}</span>
                </div>
            </div>
            `);
            imagesSectionFiles.push(bigVideoCanvas.toDataURL("image/jpeg"));
            imagesSection.style.justifyContent = 'flex-start';
            imagesSection.style.alignItems = 'flex-start';
        }
    }
    if (e.target.closest('#video-canvas')) {
        document.querySelector('#camera').style.display = 'none';
        document.querySelector('#images').style.display = 'block';
        if (taskBarArray.includes('images')) {
            return;
        }
        taskBarArray.push('images');
        document.getElementById('task-bar').innerHTML += `<div class="task-app-holder" id="task-app-holder-images"><img style="width: 20px; height: 20px;" src="./img/start-images-logo.svg"></div>`;
    }
    if (e.target.closest('#shutdown-start-btn')) {
        if (openShutdown === false) {
            document.querySelector('.shutdown-btns-holder').style.left = 0;
            openShutdown = true;
        }
        else if (openShutdown === true) {
            document.querySelector('.shutdown-btns-holder').style.left = -250 + 'px';
            openShutdown = false;
        }
    }
    if (!e.target.closest('#shutdown-start-btn')) {
        document.querySelector('.shutdown-btns-holder').style.left = -250 + 'px';
        openShutdown = false;
    }
    if (e.target.closest('#start-restart-btn')) {
        location.reload();
    }
    if (e.target.closest('#real-shutdown-btn')) {
        console.log('ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR');
        setTimeout(function () {
            location.reload();
        }, 10000);
        document.querySelector('body').style.backgroundColor = 'rgb(35, 105, 180)';
        document.querySelector('body').innerHTML = `<img style="width: 100vw; height: 100vh;" src="./img/blue-screen-of-death.png">`;
    }
    if (e.target.closest('#start-sleep-btn')) {
        hideFunction('.time');
        hideFunction('.message-task-bar');
        hideFunction('.start-menu');
        openShutdown = false, openStart = false;
        document.querySelector('.shutdown-btns-holder').style.left = -250 + 'px';
        document.querySelector('.sleep-section').style.zIndex = 10000;
        document.querySelector('.sleep-section').style.backgroundColor = 'rgba(0, 0, 0, 1)';
        document.querySelector('body').style.cursor = 'url("./img/start-sleep-logo.svg"), auto';
        return;
    }
    if (e.target.closest('.sleep-section')) {
        document.querySelector('.sleep-section').style.zIndex = -1;
        document.querySelector('.sleep-section').style.backgroundColor = 'rgba(0, 0, 0, 0)';
        document.querySelector('body').style.cursor = 'default';
    }
    if (e.target.closest('#camera-start-btn')) {
        cameraOpen = true;
        cameraFunction();
    }
    if (e.target.closest('.start-holder')) {
        if (openStart === true) {
            openStart = false;
            hideFunction('.start-holder');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
        }
        else if (openStart === false) {
            openStart = true;
            showUpFunction('.start-menu');
            document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
        }
    }
    if (e.target.closest('.start-menu') || e.target.closest('.task-bar-search-holder')) {
        openStart = true;
        showUpFunction('.start-menu');
        document.querySelector('.start-holder').style.backgroundColor = 'rgb(31, 31, 31)';
    }
    if (!e.target.closest('.start-holder') && !e.target.closest('.start-menu') && !e.target.closest('.task-bar-search-holder')) {
        openStart = false;
    }
    if (e.target.closest('.task-bar-search-holder')) {
        firstInputValue = document.querySelector('.search-input').value;
        secondInputValue = null;
    }
    if (e.target.closest('.lil-time-holder')) {
        if (openTime === true) {
            openTime = false;
            hideFunction('.time');
        }
        else if (openTime === false) {
            openTime = true;
            showUpFunction('.time');
        }
    }
    if (e.target.closest('.time')) {
        showUpFunction('.time');
        openTime = true;
    }
    if (!e.target.closest('.lil-time-holder') && !e.target.closest('.time')) {
        openTime = false;
    }
    if (e.target.closest('.message-task-bar-icon')) {
        if (openMessage === true) {
            openMessage = false;
            hideFunction('.message-task-bar');
        }
        else if (openMessage === false) {
            openMessage = true;
            showUpFunction('.message-task-bar');
        }
    }
    if (e.target.closest('.message-task-bar')) {
        showUpFunction('.message-task-bar');
        openMessage = true;
    }
    if (!e.target.closest('.message-task-bar-icon') && !e.target.closest('.message-task-bar')) {
        openMessage = false;
    }
    if (e.target.closest('.start-menu-app-holder') || e.target.closest('.start-menu-btn')) {
        hideFunction('.start-menu');
        openStart = false;
        document.querySelector('.start-holder').style.backgroundColor = 'rgb(16, 16, 16)';
    }
    //сообщения
    if (e.target.closest('.del-messages-btn')) {
        openMessage = false;
        document.querySelector('#area-message').innerHTML = `<p>No messages yet</p>`;
        document.querySelector('.del-messages-btn').style.display = 'none';
        document.querySelector('#new-message-indicator').style.display = 'none';
        hideFunction('.message-task-bar');
    }
    //кнопки таймера и его кента
    if (e.target.closest('.stopwatch-holder')) {
        document.querySelector('.stopwatch').style.display = 'block';
        document.querySelector('.timer').style.display = 'none';
        document.querySelector('.timer-holder').classList.remove('stopwatch-and-timer-properties');
        document.querySelector('.stopwatch-holder').classList.add('stopwatch-and-timer-properties');
    }
    if (e.target.closest('.timer-holder')) {
        document.querySelector('.timer').style.display = 'block';
        document.querySelector('.stopwatch').style.display = 'none';
        document.querySelector('.stopwatch-holder').classList.remove('stopwatch-and-timer-properties');
        document.querySelector('.timer-holder').classList.add('stopwatch-and-timer-properties');
    }
    if (e.target.closest('.start-stopwatch')) {
        document.querySelector('.start-stopwatch').style.display = 'none';
        document.querySelector('.pause-stopwatch').style.display = 'block';
        document.querySelector('.reset-stopwatch').style.display = 'none';
        document.querySelector('.lap-stopwatch').style.display = 'block';
        stopwatchInterval = setInterval(stopwatchFunction, 10);
        lapInterval = setInterval(lapFunction, 10);
    }
    if (e.target.closest('.pause-stopwatch')) {
        document.querySelector('.pause-stopwatch').style.display = 'none';
        document.querySelector('.start-stopwatch').style.display = 'block';
        document.querySelector('.lap-stopwatch').style.display = 'none';
        document.querySelector('.reset-stopwatch').style.display = 'block';
        clearInterval(stopwatchInterval);
        clearInterval(lapInterval);
    }
    if (e.target.closest('.reset-stopwatch')) {
        ms = 00, sec = 00, min = 00, msLap = 00, secLap = 00, minLap = 00;
        addNumStopwatch();
        while (lapSaction.firstChild) {
            lapSaction.removeChild(lapSaction.firstChild);
        }
    }
    if (e.target.closest('.lap-stopwatch')) {
        if (document.querySelector('.stopwatch-numbers').innerHTML !== '00:00,00') {
            lapNumArray = (minLap > 9 ? minLap : '0' + minLap) + ':' + (secLap > 9 ? secLap : '0' + secLap) + ',' + (msLap > 9 ? msLap : '0' + msLap);
            lapP = document.createElement('p');
            lapP.className = 'lap-content';
            lapP.innerHTML = lapNumArray;
            lapSaction.append(lapP);
        }
        msLap = 00, secLap = 00, minLap = 00;
    }
    if (e.target.closest('.start-timer')) {
        document.querySelector('.stop-timer').style.display = 'block';
        document.querySelector('.start-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'block';
        document.querySelector('.reset-timer').style.display = 'block';
        timerInterval = setInterval(timerFunction, 1000);
    }
    if (e.target.closest('.stop-timer')) {
        document.querySelector('.start-timer').style.display = 'block';
        document.querySelector('.stop-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'block';
        clearInterval(timerInterval);
    }
    if (e.target.closest('.reset-timer')) {
        document.querySelector('.start-timer').style.display = 'block';
        document.querySelector('.stop-timer').style.display = 'none';
        document.querySelector('.dont-click-timer').style.display = 'none';
        document.querySelector('.reset-timer').style.display = 'none';
        document.querySelector('.timer-min').value = 0;
        document.querySelector('.timer-sec').value = 30;
        clearInterval(timerInterval);
    }
});
