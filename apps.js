// открытие
let taskBarArray = [];
for (let appLogo of document.querySelectorAll('.shortcut')) {
	appLogo.addEventListener('dblclick', (e) => {
		let shortcutId = appLogo.id.slice(0, -5);
		document.getElementById(shortcutId).style.display = 'block';
		let taskBarAppSrc = appLogo.querySelector('.app-icon').getAttribute("src");
		if (taskBarArray.includes(shortcutId)) {
			return;
		}
		taskBarArray.push(shortcutId);
		document.getElementById('task-bar').innerHTML += `<div class="task-app-holder" id="task-app-holder-` + shortcutId + `"><img src="` + taskBarAppSrc + `"></div>`;
	});
	appLogo.addEventListener('mousemove', function () {
		this.style.backgroundColor = 'rgba(45, 75, 185, 0.7)';
		this.style.border = 'solid 2px rgba(20, 20, 20, 0.7)';
	});
	appLogo.addEventListener('mouseout', function () {
		this.style.backgroundColor = 'rgba(45, 75, 185, 0)';
		this.style.border = 'solid 2px rgba(20, 20, 20, 0)';
	});
	document.querySelector('.start-menu-app-section').innerHTML +=
		`<div class="start-menu-app-holder" id="start-${appLogo.id.slice(0, -5)}">
		<img src="${appLogo.querySelector('.app-icon').getAttribute("src")}" style="width: 30px; height: 30px; padding: 5px 10px 5px 10px;">
		<p style="font-weight: 300;">${appLogo.lastElementChild.firstElementChild.textContent}</p>
	</div>`;
}

for (appLogo of document.querySelectorAll('.start-menu-app-holder')) {
	appLogo.addEventListener('click', function () {
		document.getElementById(this.id.slice(6)).style.display = 'block';
		let taskBarAppSrc = this.firstElementChild.getAttribute("src");
		if (taskBarArray.includes(this.id.slice(6))) {
			return;
		}
		taskBarArray.push(this.id.slice(6));
		document.getElementById('task-bar').innerHTML += `<div class="task-app-holder" id="task-app-holder-` + this.id.slice(6) + `"><img style="width: 20px; height: 20px;" src="` + taskBarAppSrc + `"></div>`;
	});
}

for (let appLogo of document.querySelectorAll('.start-menu-btn')) {
	appLogo.addEventListener('click', function () {
		let shortcutId = this.id.slice(0, -10);
		document.getElementById(shortcutId).style.display = 'block';
		let taskBarAppSrc = appLogo.querySelector('.img-btn-start').getAttribute("src");
		if (taskBarArray.includes(shortcutId)) {
			return;
		}
		taskBarArray.push(shortcutId);
		document.getElementById('task-bar').innerHTML += `<div class="task-app-holder" id="task-app-holder-` + shortcutId + `"><img style="width: 20px; height: 20px;" src="` + taskBarAppSrc + `"></div>`;
	});
}







document.querySelector('#task-bar').addEventListener('click', (e) => {
	if (e.target.id.slice(16) === 'camera') {
		cameraOpen = true;
		cameraFunction();
	}
	if (e.target.closest('.task-app-holder')) {
		if (window.getComputedStyle(document.getElementById(e.target.id.slice(16))).display == 'block') {
			document.getElementById(e.target.id.slice(16)).style.display = 'none';
		}
		else if (window.getComputedStyle(document.getElementById(e.target.id.slice(16))).display == 'none') {
			document.getElementById(e.target.id.slice(16)).style.display = 'block';
		}
	}
});

//закрытие и свертывание
let roll = false;
let nodeListDragBtnHolder = document.querySelectorAll('.drag-btns-holder');
for (let dragBtnHolder of nodeListDragBtnHolder) {
	dragBtnHolder.addEventListener('click', (e) => {
		if (e.target.classList.contains('hide-btn-drag')) {
			document.getElementById(e.target.id.split("-").pop()).style.display = 'none';
			if (e.target.id.split("-").pop() === 'camera') {
				cameraOpen = false;
				cameraFunction();
			}
		}
		if (e.target.classList.contains('roll-btn-drag')) {
			if (roll === false) {
				document.getElementById(e.target.id).innerHTML = '<i class="fa-regular fa-square"></i>';
				roll = true;
			} else {
				roll = false;
				document.getElementById(e.target.id).innerHTML = '<i class="fa-regular fa-clone"></i>';
			}
		}
		if (e.target.closest('.fa-regular')) {
			if (roll === false) {
				e.target.parentNode.innerHTML = '<i class="fa-regular fa-square"></i>';
				roll = true;
			} else {
				roll = false;
				e.target.parentNode.innerHTML = '<i class="fa-regular fa-clone"></i>';
			}
		}
		if (e.target.classList.contains('close-btn-drag')) {
			document.getElementById(e.target.id.split("-").pop()).style.transition = '0.2s';
			document.getElementById(e.target.id.split("-").pop()).style.transform = 'scale(0)';
			setTimeout(() => {
				document.getElementById(e.target.id.split("-").pop()).style.display = 'none';
				document.getElementById(e.target.id.split("-").pop()).style.transition = 'none';
				document.getElementById(e.target.id.split("-").pop()).style.transform = 'scale(1)';
			}, 200);
			if (e.target.id.split("-").pop() === 'camera') {
				cameraOpen = false;
				cameraFunction();
			}
			document.getElementById('task-bar').removeChild(document.getElementById('task-app-holder-' + e.target.id.slice(15)));
			for (let i = 0; i < taskBarArray.length; i++) {
				if (taskBarArray[i] === e.target.id.slice(15)) {
					taskBarArray.splice(i, 1);
					break;
				}
			}
		}
	});
}

//передвижение
function dragFunction(e) {
	//xCoordinate то на какой писксель мы нажали в самом обьекте 
	document.getElementById(appId).style.left = e.pageX - xCoordinate + "px";
	document.getElementById(appId).style.top = e.pageY - yCoordinate + "px";
	if (e.pageY < yCoordinate) {
		document.getElementById(appId).style.top = 0 + 'px';
	}
	if (e.pageX < xCoordinate) {
		document.getElementById(appId).style.left = 0 + 'px';
	}

	if (window.innerWidth < document.getElementById(appId).clientWidth + e.pageX - xCoordinate) {
		document.getElementById(appId).style.left = window.innerWidth - document.getElementById(appId).clientWidth + 'px';
	}

	if (window.innerHeight - document.querySelector('footer').clientHeight < e.pageY + 30 - yCoordinate) {
		document.getElementById(appId).style.top = window.innerHeight - document.querySelector('footer').clientHeight - 30 + 'px';
	}
	let alignmentAppX, alignmentAppY;
	alignmentAppX = e.pageX + appId.offsetWidth - window.innerWidth;
	alignmentAppY = e.pageY + appId.offsetHeight - window.innerHeight;
}
let appId, dragId, nodeListDrag = document.querySelectorAll('.drag');
for (let drag of nodeListDrag) {
	drag.addEventListener('mousedown', (e) => {
		dragId = drag.id;
		appId = dragId.slice(5);
		document.addEventListener('mousemove', dragFunction);
		xCoordinate = e.offsetX;
		yCoordinate = e.offsetY;
	});
}


document.addEventListener('mouseup', () => {
	document.removeEventListener('mousemove', dragFunction);
});



// calculator
let sign = '', signClick = 0; a = 0, b = 0, calcNumber = document.querySelector('.calc-number');
function answerFunction() {
	if (sign == '-') {
		a = Number(b) - Number(a);
	}
	if (sign == '+') {
		a = Number(b) + Number(a);
	}
	if (sign == '*') {
		a = Number(b) * Number(a);
	}
	if (sign == '/') {
		a = Number(b) / Number(a);
	}
	b = 0;
}


function cleanBtnCalculator() {
	document.querySelectorAll('.calc-btn').forEach((e) => {
		e.style.backgroundColor = 'rgb(250, 140, 0)';
		e.style.color = 'white';
		document.querySelectorAll('.calc-black-btn').forEach((e) => {
			e.style.backgroundColor = 'rgb(49, 49, 49)';
		});
	});
}
document.querySelector('.calc-buttons').addEventListener('click', (e) => {
	if (!e.target.classList.contains('calc-btn')) {
		return;
	}
	if (e.target.classList.contains('calc-btn')) {
		cleanBtnCalculator();
	}
	if (e.target.classList.contains('calc-btn') && !e.target.classList.contains('calc-btn-equal')) {
	}
	if (e.target.classList.contains('calc-btn-num')) {
		if (signClick > 0) {
			b = a;
			a = 0;
			signClick = 0;
		}
		a = '' + a + e.target.textContent;
	}
	if (e.target.classList.contains('calc-btn-AC')) {
		a = 0;
		b = 0;
		sign = '';
		signClick = 0;
		calcNumber.textContent = 0;
	}
	if (e.target.classList.contains('calc-btn-plus-minus')) {
		if (String(a)[0] == '-') {
			a = String(a).slice(1);
		} else if (String(a)[0] != '-') {
			a = '-' + a;
		}
		signClick = 0;
	}
	if (e.target.classList.contains('calc-btn-del')) {
		a = String(a).slice(0, -1);
	}
	if (e.target.classList.contains('calc-btn-exponentiate')) {
		a = a ** 2;
	}
	if (e.target.classList.contains('calc-btn-dot')) {
		if (!String(a).includes('.', 0)) {
			a = a + '.';
		}
	}
	if (e.target.classList.contains('calc-btn-minus')) {
		e.target.style.backgroundColor = 'white';
		e.target.style.color = 'rgb(250, 140, 0)';
		if (a != 0 && b != 0) {
			answerFunction();
		}
		sign = '-';
		signClick++;
	}
	if (e.target.classList.contains('calc-btn-plus')) {
		e.target.style.backgroundColor = 'white';
		e.target.style.color = 'rgb(250, 140, 0)';
		if (a != 0 && b != 0) {
			answerFunction();
		}
		sign = '+';
		signClick++;
	}
	if (e.target.classList.contains('calc-btn-x')) {
		e.target.style.backgroundColor = 'white';
		e.target.style.color = 'rgb(250, 140, 0)';
		if (a != 0 && b != 0) {
			answerFunction();
		}
		sign = '*';
		signClick++;
	}
	if (e.target.classList.contains('calc-btn-divide')) {
		e.target.style.backgroundColor = 'white';
		e.target.style.color = 'rgb(250, 140, 0)';
		if (a != 0 && b != 0) {
			answerFunction();
		}
		sign = '/';
		signClick++;
	}
	if (e.target.classList.contains('calc-btn-equal')) {
		signClick = 0;
		answerFunction();
		sign = '';
	}
	if (String(a)[0] == 0 && String(a)[1] != '.') {
		a = String(a).slice(1);
	}
	if (String(a)[0] == '-' && String(a)[1] == 0 && String(a).length > 2) {
		a = '-' + String(a).slice(2);
	}
	if (a == '-') {
		a = '-0'
	}
	if (a == '') {
		a = 0;
	}
	if (Number.isNaN(a)) {
		a = 0;
		b = 0;
	}
	calcNumber.textContent = a;
	if (calcNumber.textContent.length < 10) {
		calcNumber.style.fontSize = '34px';
	}
	if (calcNumber.textContent.length > 9 && calcNumber.textContent.length < 17) {
		calcNumber.style.fontSize = '18px';
	}
	if (calcNumber.textContent.length > 16 && calcNumber.textContent.length < 24) {
		calcNumber.style.fontSize = '14px';
	}
	if (calcNumber.textContent.length > 23) {
		calcNumber.style.fontSize = '10px';
	}
	if (calcNumber.textContent.length > 31) {
		calcNumber.style.overflowX = 'scroll';
	}
});
// notes
let addNotesClick = 0;
let notesColors = ['#ff88ab', '#abff88', '#a188ff', '#ffdc88'];
document.querySelector('.notes-section').addEventListener('click', (e) => {
	if (e.target.closest('#add-notes')) {
		addNotesClick++;
		document.getElementById('add-notes').insertAdjacentHTML('afterend', `
		<div class="notes" id="note-${addNotesClick}">
			<input class="note-input" id="note-input-${addNotesClick}" type="text" placeholder="New note">
			<textarea class="note-textarea" id="note-textarea-${addNotesClick}" placeholder="Text"></textarea>
            <div class="notes-btn-holder">
                <button id="copy-note-${addNotesClick}" class="notes-btn">Copy</button>
                <button id="del-note-${addNotesClick}" class="notes-btn">Delete</button>
            </div>
        </div>
		`);
		let randomNotesColor = notesColors[Math.floor(Math.random() * notesColors.length)];
		document.getElementById('note-' + addNotesClick).style.backgroundColor = randomNotesColor;
		document.getElementById('note-input-' + addNotesClick).style.backgroundColor = randomNotesColor;
		document.getElementById('note-textarea-' + addNotesClick).style.backgroundColor = randomNotesColor;
	}
	if (e.target.closest('.notes-btn')) {
		if (e.target.closest('.notes-btn').id[0] == 'c') {
			let idTextarea = 'note-textarea-' + e.target.closest('.notes-btn').id.split('-')[2];
			let contentTextarea = document.getElementById(idTextarea).value;
			navigator.clipboard.writeText(contentTextarea);
			document.getElementById(e.target.closest('.notes-btn').id).innerHTML = 'Copied!';
			setTimeout(() => { document.getElementById(e.target.closest('.notes-btn').id).innerHTML = 'Copy' }, 2000);
		}
		if (e.target.closest('.notes-btn').id[0] == 'd') {
			let idNote = 'note-' + e.target.closest('.notes-btn').id.split('-')[2];
			document.getElementById(idNote).style.transform = 'scale(0)';
			setTimeout(() => { document.getElementById(idNote).style.display = 'none' }, 200);
			setTimeout(() => { document.getElementById(idNote).remove(); }, 2000);
		}
	}
});

//document
function modifyText(command, defaultUi, value) {
	document.execCommand(command, defaultUi, value);
};
document.querySelectorAll('.document-btn').forEach((button) => {
	button.addEventListener("click", () => {
		modifyText(button.id.slice(0, -9), false, null);
		if (button.id.slice(0, -9) == 'removeFormat') {
			document.querySelector('.document-size-btn').value = 3;
		}
		document.querySelector('#text-input-document').focus();
	});
});
document.querySelectorAll('.document-color-btn').forEach((button) => {
	button.addEventListener("change", () => {
		modifyText(button.id.slice(0, -9), false, button.value);
	});
});
document.querySelector('.document-size-btn').addEventListener("change", function () {
	document.querySelector('#text-input-document').focus();
	modifyText('fontSize', false, this.value);
});