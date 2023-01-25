let canvas = document.getElementById("game-canvas");
let ctxGame = canvas.getContext("2d");
let leftPressed = false;
let rightPressed = false;
let left = false, right = true;
let jumpPressed = false;
let jumpCount = 0;
let jumpLength = 50;
let jumpHeight = 0;

canvas.style.backgroundColor = '#eee';
canvas.width = window.screen.width - window.screen.width / 5;
canvas.height = window.screen.height - window.screen.height / 4;

let playerHeight = 50;
let playerWidth = 50;
let playerX = 100;
let playerY = canvas.height - playerHeight;
let firstJumpPosition = 0;
let fall = false;
let botX = canvas.width;
let shot = false;



document.addEventListener("keydown", (e) => {
	if (e.code == 'ArrowRight' || e.code == 'KeyD') {
		rightPressed = true;
		leftPressed = false;
		right = true;
		left = false;
	}
	if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
		rightPressed = false;
		leftPressed = true;
		left = true;
		right = false;
	}
	if (e.code == 'ArrowUp' || e.code == 'KeyW') {
		jumpPressed = true;
	}
});

document.addEventListener("keyup", (e) => {
	if (e.code == 'ArrowRight' || e.code == 'KeyD') {
		rightPressed = false;
	}
	if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
		leftPressed = false;
	}
	if (e.code == 'Enter' || e.code == 'Space') {
		shot = true;
	}
});







function image() {
	// playerY = canvas.height - playerHeight - jumpHeight;
	ctxGame.beginPath();
	ctxGame.rect(playerX, playerY, playerWidth, playerHeight);
	ctxGame.fillStyle = "#FF0000";
	ctxGame.fill();
	ctxGame.closePath();

	ctxGame.beginPath();
	ctxGame.rect(canvas.width / 2 - 100, canvas.height - 120, 200, 10);
	ctxGame.fillStyle = "#000000";
	ctxGame.fill();
	ctxGame.closePath();

	ctxGame.beginPath();
	ctxGame.rect(botX, canvas.height - 60, 60, 60);
	ctxGame.fillStyle = "#0000FF";
	ctxGame.fill();
	ctxGame.closePath();


	ctxGame.beginPath();
	ctxGame.fillText(fall, 50, 50)
	ctx.font = "48px serif";
	ctxGame.fillStyle = "#0000FF";
	ctxGame.fill();
	ctxGame.closePath();

}
function move() {
	if (rightPressed) {
		playerX += 5;
		if (canvas.width < playerX + playerHeight) {
			playerX = canvas.width - playerWidth;
		}
	}
	if (leftPressed) {
		playerX -= 5;
		if (0 > playerX) {
			playerX = 0;
		}
	}
	if (canvas.height < playerY + playerHeight) {
		playerY = canvas.height - playerHeight;
	}
	if (jumpPressed) {
		jumpCount++;
		jumpHeight = Math.floor(3 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength) + firstJumpPosition);
		playerY = canvas.height - playerHeight - jumpHeight;
	}
	if (jumpHeight < 0) {
		jumpCount = 0;
		jumpHeight = 0;
		jumpPressed = false;
	}
	if (botX > playerX) {
		botX -= 2;
	} else botX += 2;
}
function shotFunction() {
	if (shot) {
		ctxGame.beginPath();
		ctxGame.fillStyle = "#FFD500";
		if (right) {
			ctxGame.rect(playerX, playerY - 5 + playerHeight / 2, canvas.width, 10);
		}
		if (left) {
			ctxGame.rect(playerX, playerY - 5 + playerHeight / 2, -canvas.width, 10);
		}
		ctxGame.fill();
		ctxGame.closePath();
		setTimeout(() => {
			shot = false;
		}, 100);
	}
}
function collision(x, y, w, h) {
	if ((playerY + playerHeight - 3 <= y && playerY + playerHeight >= y - 2) && (playerX <= x + w && x <= playerX + 50)) {
		playerY = y - playerHeight;
		jumpCount = 0;
		jumpHeight = 0;
		jumpPressed = false;
		firstJumpPosition = canvas.height - y;
		fall = false;
		// jumpHeight = y;
	}
	else {
		if (playerY + playerHeight >= canvas.height) {
			playerY = canvas.height - playerHeight;
			firstJumpPosition = 0;
			fall = false;
		} else {
			playerY += 5;
			fall = true;
		}
	}
}

function drawGame() {
	ctxGame.clearRect(0, 0, canvas.width, canvas.height);
	move();
	shotFunction();
	image();
	collision(canvas.width / 2 - 100, canvas.height - 120, 200, 10);
}
setInterval(drawGame, 10);