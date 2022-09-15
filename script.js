const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 4;
let ballSpeedY = 4;

function player() {
	ctx.fillStyle = '#7FFF00';
	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
	ctx.fillStyle = 'yellow';
	ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function ball() {
	ctx.fillStyle = 'white'; // #ffffff;
	ctx.fillRect(ballX, ballY, ballSize, ballSize);

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Top & bottom curves
	if (ballY <= 0 || ballY + ballSize >= ch) {
		ballSpeedY = -ballSpeedY;
		speedUp();
	}

	// Left & right curves
	if (ballX <= 0) {
		// ballSpeedX = -ballSpeedX;
		// speedUp();
		clearInterval(gameRender);
		gameRender = 0;
		alert('Computer win');
	} else if (ballX + ballSize >= cw) {
		console.log(`ballX + ballSize = ${ballX + ballSize}`);
		clearInterval(gameRender);
		gameRender = 0;
		console.log(gameRender);
		alert('You win');
	}

	// Bounces the ball off the player's pallet
	if (
		ballX <= playerX + paddleWidth &&
		ballY + ballSize / 2 >= playerY &&
		ballY + ballSize / 2 <= playerY + paddleHeight
	) {
		// ballX += 5;
		ballSpeedX = -ballSpeedX;
		speedUp();
	}

	// Ball bounces off the AI pallet
	if (
		ballX + ballSize >= aiX &&
		ballY + ballSize / 2 >= aiY &&
		ballY + ballSize / 2 <= aiY + paddleHeight
	) {
		// ballX -= 5;
		ballSpeedX = -ballSpeedX;
		speedUp();
	}
}

function table() {
	// Table
	ctx.fillStyle = 'black'; // default #000000
	ctx.fillRect(0, 0, cw, ch);

	// Lines in the middle
	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
		ctx.fillStyle = 'gray';
		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
	}
}

let topCanvas = canvas.offsetTop;

function playerPosition(e) {
	playerY = e.clientY - topCanvas - paddleHeight / 2;

	if (playerY > ch - paddleHeight) {
		// >=
		playerY = ch - paddleHeight;
	}

	if (playerY < 0) {
		// <=
		playerY = 0;
	}

	// for test
	// aiY = playerY;
}

function speedUp() {
	console.log(`X: ${ballSpeedX}, Y: ${ballSpeedY}`);
	// Speed X
	if (ballSpeedX > 0 && ballSpeedX < 16) {
		ballSpeedX += 0.2;
	} else if (ballSpeedX < 0 && ballSpeedX > -16) {
		ballSpeedX -= 0.2;
	}

	// Speed Y
	if (ballSpeedY > 0 && ballSpeedY < 16) {
		ballSpeedY += 0.2;
	} else if (ballSpeedY < 0 && ballSpeedY > -16) {
		ballSpeedY -= 0.2;
	}
}

// AI
function aiPosition() {
	const middlePaddle = aiY + paddleHeight / 2;
	const middleBall = ballY + ballSize / 2;

	if (ballX > 500) {
		if (middlePaddle - middleBall > 200) {
			aiY -= 24;
		} else if (middlePaddle - middleBall > 50) {
			aiY -= 10;
		} else if (middlePaddle - middleBall < -200) {
			aiY += 24;
		} else if (middlePaddle - middleBall < -50) {
			aiY += 10;
		}
	}

	if (ballX <= 500 && ballX > 100) {
		if (middlePaddle - middleBall > 100) {
			aiY -= 3;
		}
		if (middlePaddle - middleBall < -100) {
			aiY += 3;
		}
	}

	if (aiY >= ch - paddleHeight) {
		aiY = ch - paddleHeight;
	}

	if (aiY <= 0) {
		aiY = 0;
	}
}

canvas.addEventListener('mousemove', playerPosition);

function game() {
	table();
	ball();
	player();
	ai();
	aiPosition();

	if (gameRender === 0) {
		location.reload();
	}
}

let gameRender = setInterval(game, 1000 / 60);
