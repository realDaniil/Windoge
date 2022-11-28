// call
// let calculatorOpen = false
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
// if(calculatorOpen === true){
	document.querySelector('.calc-buttons').addEventListener('click', (e) =>{
		if(!e.target.classList.contains('calc-btn')){
			return;
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
			if(signClick>0){
				answerFunction();
			}
			sign = '';
			a = a**2;
		}
		if(e.target.classList.contains('calc-btn-dot')){
			if(!String(a).includes('.', 0)){
				a = a + '.';
			}
		}
		if(e.target.classList.contains('calc-btn-minus')){
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '-';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-plus')){
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '+';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-x')){
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '*';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-divide')){
			if(a!=0 && b!=0){
				answerFunction();
			}
			sign = '/';
			signClick++;
		}
		if(e.target.classList.contains('calc-btn-equal')){
			signClick = 0;
			answerFunction();
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