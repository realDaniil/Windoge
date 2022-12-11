// открытие
let nodeListShortcut = document.querySelectorAll('.shortcut');
let appSrcArray = [];
for(let appLogo of nodeListShortcut){
    appLogo.addEventListener('dblclick', (e)=>{
        let shortcutId = appLogo.id.slice(0, -5);
		let appSrc = appLogo.querySelector('.app-icon').getAttribute("src");
		if(appSrcArray.includes(appSrc)){
			return;
		} else document.getElementById('task-bar').innerHTML += `<div class="task-app-holder"><img class = 'task-app-icon-app'src="`+ appSrc +`"></div>`;
		appSrcArray.push(appSrc);
        document.getElementById(shortcutId).style.display = 'block';
    });
}


//закрытие и свертывание
let roll = false;
let nodeListDragBtnHolder = document.querySelectorAll('.drag-btns-holder');
for(let dragBtnHolder of nodeListDragBtnHolder){[
	dragBtnHolder.addEventListener('click', (e)=>{
		if(e.target.classList.contains('hide-btn-drag')){
			
		}
		if(e.target.classList.contains('roll-btn-drag')){
			
			if(roll === false){
				document.getElementById(e.target.id).style.backgroundImage = 'url("./img/square.svg")';
				roll = true;
			}
			// else if(roll === true){
			// 	roll = false;
			// 	document.getElementById(e.target.id).style.backgroundImage = 'url("./img/double_square.svg")';
			// }
		}
		if(e.target.classList.contains('close-btn-drag')){
			document.getElementById(e.target.id.split("-").pop()).style.display = 'none';
		}
	})
]}

//передвижение
function dragFunction(e){
	//xCoordinate то на какой писксель мы нажали в самом обьекте 
	document.getElementById(appId).style.left = e.pageX - xCoordinate + "px";
	document.getElementById(appId).style.top = e.pageY - yCoordinate + "px";
	document.querySelector('body').style.cursor = 'grabbing';

if(e.pageY<yCoordinate){
	document.getElementById(appId).style.top = 0 + 'px';
}
if(e.pageX<xCoordinate){
	document.getElementById(appId).style.left = 0 + 'px';
}

if(window.innerWidth<document.getElementById(appId).clientWidth + e.pageX - xCoordinate){
	document.getElementById(appId).style.left = window.innerWidth - document.getElementById(appId).clientWidth + 'px';
}

if(window.innerHeight - document.querySelector('footer').clientHeight<e.pageY+30-yCoordinate){
	document.getElementById(appId).style.top = window.innerHeight - document.querySelector('footer').clientHeight - 30 + 'px';
}
	let alignmentAppX, alignmentAppY;
	alignmentAppX = e.pageX + appId.offsetWidth - window.innerWidth;
	alignmentAppY = e.pageY + appId.offsetHeight - window.innerHeight;
}
let appId, dragId, nodeListDrag = document.querySelectorAll('.drag');
for (let drag of nodeListDrag){
	drag.addEventListener('mousedown', (e)=>{
		dragId = drag.id;
		appId = dragId.slice(5);
		document.addEventListener('mousemove',dragFunction);
		xCoordinate = e.offsetX;
		yCoordinate = e.offsetY;
	});
}


document.addEventListener('mouseup', ()=>{
	document.removeEventListener('mousemove', dragFunction);
	document.querySelector('body').style.cursor = 'default';
});



// calculator
let sign = '', signClick = 0; a = 0, b = 0, calcNumber = document.querySelector('.calc-number');
function answerFunction(){
	if(sign == '-'){
		a = Number(b) - Number(a);
	}
	if(sign == '+'){
		a = Number(b) + Number(a);
	}
	if(sign == '*'){
		a = Number(b) * Number(a);
	}
	if(sign == '/'){
		a = Number(b) / Number(a);
	}
	b = 0;
}


function cleanBtnCalculator(){
	document.querySelectorAll('.calc-btn').forEach((e)=>{
		e.style.backgroundColor = 'rgb(250, 140, 0)';
		e.style.color = 'white';
		document.querySelectorAll('.calc-black-btn').forEach((e) =>{
			e.style.backgroundColor = 'rgb(49, 49, 49)';
		})
	});
}
document.querySelector('.calc-buttons').addEventListener('click', (e) =>{
		if(!e.target.classList.contains('calc-btn')){
			return;
		}
		if(e.target.classList.contains('calc-btn')){
			cleanBtnCalculator();
		}
		if(e.target.classList.contains('calc-btn') && !e.target.classList.contains('calc-btn-equal')){
		}
		if(e.target.classList.contains('calc-btn-num')){
			if(signClick > 0){
				b = a;
				a = 0;
				signClick = 0;
			} 
			a = '' + a + e.target.textContent;
		}
		if(e.target.classList.contains('calc-btn-AC')){
			a = 0;
			b = 0;
			sign = '';
			signClick = 0;
			calcNumber.textContent = 0;
		}
		if(e.target.classList.contains('calc-btn-plus-minus')){
			if(String(a)[0] == '-'){
				a = String(a).slice(1);
			} else if(String(a)[0] != '-'){
				a = '-' + a;
			}
			signClick = 0;
		}
		if(e.target.classList.contains('calc-btn-del')){
			a = String(a).slice(0, -1);
		}
		if(e.target.classList.contains('calc-btn-exponentiate')){
			a = a**2;
		}
		if(e.target.classList.contains('calc-btn-dot')){
			if(!String(a).includes('.', 0)){
				a = a + '.';
			}
		}
		if(e.target.classList.contains('calc-btn-minus')){
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '-';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-plus')){
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '+';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-x')){
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '*';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-divide')){
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '/';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-equal')){
			signClick = 0;
			answerFunction();
			sign ='';
		}
		if(String(a)[0] == 0 && String(a)[1] != '.'){
			a = String(a).slice(1);
		}
		if(String(a)[0] == '-' && String(a)[1] == 0 && String(a).length > 2){
			a = '-' + String(a).slice(2);
		}
		if(a == '-'){
			a = '-0'
		}
		if(a == ''){
			a = 0;
		}
		if(a === Infinity || a === -Infinity){
			a = 'Very big number';
		}
		if(Number.isNaN(a)){
			a = 0;
			b = 0;
		}
		console.log(a, b, sign)
		calcNumber.textContent = a;
		if(calcNumber.textContent.length < 10){
			calcNumber.style.fontSize = '34px';
		}
		if(calcNumber.textContent.length > 9 && calcNumber.textContent.length < 17){
			calcNumber.style.fontSize = '18px';
		}
		if(calcNumber.textContent.length > 16 && calcNumber.textContent.length < 24){
			calcNumber.style.fontSize = '14px';
		}
		if(calcNumber.textContent.length > 23){
			calcNumber.style.fontSize = '10px';
		}
		if(calcNumber.textContent.length > 31){
			calcNumber.style.overflowX = 'scroll';
		}
	});