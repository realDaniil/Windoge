// пофиксить калькулятор
// 













// открытие
let nodeListShortcut = document.querySelectorAll('.shortcut');
for(let appLogo of nodeListShortcut){
    appLogo.addEventListener('dblclick', ()=>{
        let shortcutId = appLogo.id.slice(0, -5);
		console.log(shortcutId)
        document.getElementById(shortcutId).style.display = 'block';
    });
}
//закрытие и свертывание
let nodeListDragBtnHolder = document.querySelectorAll('.drag-btns-holder');
for(let dragBtnHolder of nodeListDragBtnHolder){[
	dragBtnHolder.addEventListener('click', (e)=>{
		if(e.target.classList.contains('hide-btn-drag')){
			
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


if(e.pageY<yCoordinate){
	document.getElementById(appId).style.top = 0 + 'px';
	// yCoordinate = 0;
}
if(e.pageX<xCoordinate){
	document.getElementById(appId).style.left = 0 + 'px';
}

if(window.innerWidth<document.getElementById(appId).clientWidth + e.pageX - xCoordinate){
	document.getElementById(appId).style.left = window.innerWidth - document.getElementById(appId).clientWidth + 'px';
}

if(window.innerHeight - document.querySelector('footer').clientHeight< e.pageY+e.target.clientHeight-yCoordinate){
	console.log(111)
	document.getElementById(appId).style.top = window.innerHeight - document.querySelector('footer').clientHeight - 60 + 'px';
}
	let alignmentAppX, alignmentAppY;
	alignmentAppX = e.pageX + appId.offsetWidth - window.innerWidth;
	alignmentAppY = e.pageY + appId.offsetHeight - window.innerHeight;



	// if(e.pageY < 0){
    //     document.getElementById(appId).style.top = 0 + 'px';
	// 	yCoordinate = 0;
    // }





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
});










// drag.addEventListener('mousedown', (e)=>{
// 	console.log(65465)
// 	xCoordinate = e.offsetX;
// 	yCoordinate = e.offsetY;
// 	document.addEventListener('mousemove', (dragFunction()));
// });


// document.addEventListener('mouseup', e => {
//     document.removeEventListener('mousemove', dragFunction(e));
// });











// calculator
//let calculatorOpen = false;
let sign = '', signClick = 0; a = 0, b = 0, calcNumber = document.querySelector('.calc-number');
function answerFunction(){
	if(sign == '-'){
		a = Number(b) - Number(a);
		b = 0;
	}
	if(sign == '+'){
		a = Number(b) + Number(a);
		b = 0;
	}
	if(sign == '*'){
		a = Number(b) * Number(a);
		b = 0;
	}
	if(sign == '/'){
		a = Number(b) / Number(a);
		b = 0;
	}
}
function resetCalc(){
	a = 0;
	b = 0;
	sign = '';
    signClick = 0;
	calcNumber.textContent = 0;
}
function fixCalc(){
	if(a[0] == 0 && a[1] == '.'){
	}
	else if(a[0] == 0){
		a = String(a).slice(1);
	}
	else if(a[0] == '-' && a[1] == 0 && a != 0){
		a = String(a).slice(2);
	}
	if(a == ''){
		a = 0;
	}
	if(a.length < 10){
		calcNumber.style.fontSize = '34px';
		
	}
	if(a.length > 9 && a.length < 16){
		calcNumber.style.fontSize = '18px';


	}
	if(a.length > 16 && a.length < 20){
		calcNumber.style.fontSize = '14px';

	}
	if(a.length > 20){
		calcNumber.style.fontSize = '10px';

	}
}
function cleanBtnCalculator(){
	document.querySelectorAll('.calc-btn').forEach((e)=>{
		e.style.backgroundColor = 'rgb(250, 140, 0)';
		e.style.color = 'white';
	})
}
// if(calculatorOpen === true){
	document.querySelector('.calc-buttons').addEventListener('click', (e) =>{
		if(!e.target.classList.contains('calc-btn')){
			return;
		}
		if(e.target.classList.contains('calc-btn')){
			cleanBtnCalculator();
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
			cleanBtnCalculator();
			resetCalc();
		}
		if(e.target.classList.contains('calc-btn-plus-minus')){
			sign = '';
			if(signClick>0){
				b = a;
				a = 0;
			}
			if(a[0] != '-'){
				a = '-' + a;
			}
			else if(a[0] == '-'){
				a = String(a).slice(1)
			}
			signClick = 0;
		}
		if(e.target.classList.contains('calc-btn-del')){
			sign = '';
			a = String(a).slice(0, -1);
		}
		if(e.target.classList.contains('calc-btn-exponentiate')){
			if(a!=0 && b!=0){
				answerFunction();
			}
			cleanBtnCalculator();
			sign = '';
			a = a**2;
		}
		if(e.target.classList.contains('calc-btn-dot')){
			if(!String(a).includes('.', 0)){
				a = a + '.';
			}
		}
		if(e.target.classList.contains('calc-btn-minus')){
			cleanBtnCalculator();
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '-';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-plus')){
			cleanBtnCalculator();
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '+';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-x')){
			cleanBtnCalculator();
			e.target.style.backgroundColor = 'white';
			e.target.style.color = 'rgb(250, 140, 0)';
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '*';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-divide')){
			cleanBtnCalculator();
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
			cleanBtnCalculator()
		}
		fixCalc();
		calcNumber.textContent = a;
	});
// let arrCalcCodes = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Delete', 'Enter', 'Period'];
// let arrCalcCodesDigit = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'];
// 	document.addEventListener('keydown', (e) => {
// 		if(!arrCalcCodes.includes(e.code, 0)){
// 			return;
// 		}
// 		if(arrCalcCodesDigit.includes(e.code, 0)){
// 			if(signClick > 0){
// 				b = a;
// 				a = 0;
// 				signClick = 0;
// 			}
// 			a = '' + a + e.code[5];
// 		}
// 		if(e.code == 'Period' || e.code == 'Comma'){
// 			if(!String(a).includes('.', 0)){
// 				a = a + '.';
// 			}
// 		}
// 		if(e.code == 'Minus'){
// 			if(a!=0 && b!=0){
// 				answerFunction();
// 			}
// 			sign = '-';
// 			signClick++;
// 		}
// 		if(e.code == 'Equal'){
// 			if(a!=0 && b!=0){
// 				answerFunction();
// 			}
// 			sign = '+';
// 			signClick++;
// 		}
// 		if(e.code == 'Backspace'){
// 			a = String(a).slice(0, -1);
// 			calcNumber.textContent = a;
// 		}
// 		if(e.code == 'Delete'){
// 			resetCalc();
// 		}
// 		if(e.code == 'Enter'){
// 			signClick = 0;
// 			answerFunction();		
// 		}
// 		fixCalc();
// 		calcNumber.textContent = a;
// 		console.log('a' , a, 'b', b, 's', sign, 'c', signClick)
// 	});
// }