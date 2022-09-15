import { Game } from './pong.js';

const game = new Game();

// game.gameRender();

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

// canvas.width = 1000;
// canvas.height = 500;

// const cw = canvas.width;
// const ch = canvas.height;

// const ballSize = 20;
// let ballX = cw / 2 - ballSize / 2;
// let ballY = ch / 2 - ballSize / 2;

// const paddleHeight = 100;
// const paddleWidth = 20;

// const playerX = 70;
// const aiX = 910;

// let playerY = 200;
// let aiY = 200;

// const lineWidth = 6;
// const lineHeight = 16;

// let ballSpeedX = 4;
// let ballSpeedY = 4;

// // function player() {
// // 	ctx.fillStyle = '#7FFF00';
// // 	ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
// // }

// // function ai() {
// // 	ctx.fillStyle = 'yellow';
// // 	ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
// // }

// function ball() {
// 	ctx.fillStyle = 'white'; // #ffffff;
// 	ctx.fillRect(ballX, ballY, ballSize, ballSize);

// 	ballX += ballSpeedX;
// 	ballY += ballSpeedY;

// 	// Top & bottom curves
// 	if (ballY <= 0 || ballY + ballSize >= ch) {
// 		ballSpeedY = -ballSpeedY;
// 		speedUp();
// 	}

// 	// Left & right curves
// 	if (ballX <= 0) {
// 		// ballSpeedX = -ballSpeedX;
// 		// speedUp();
// 		clearInterval(gameRender);
// 		gameRender = 0;
// 		alert('Computer win');
// 	} else if (ballX + ballSize >= cw) {
// 		console.log(`ballX + ballSize = ${ballX + ballSize}`);
// 		clearInterval(gameRender);
// 		gameRender = 0;
// 		console.log(gameRender);
// 		alert('You win');
// 	}

// 	// Bounces the ball off the player's pallet
// 	if (
// 		ballX <= playerX + paddleWidth &&
// 		ballY + ballSize / 2 >= playerY &&
// 		ballY + ballSize / 2 <= playerY + paddleHeight
// 	) {
// 		// ballX += 5;
// 		ballSpeedX = -ballSpeedX;
// 		speedUp();
// 	}

// 	// Ball bounces off the AI pallet
// 	if (
// 		ballX + ballSize >= aiX &&
// 		ballY + ballSize / 2 >= aiY &&
// 		ballY + ballSize / 2 <= aiY + paddleHeight
// 	) {
// 		// ballX -= 5;
// 		ballSpeedX = -ballSpeedX;
// 		speedUp();
// 	}
// }

// // function table() {
// // 	// Table
// // 	ctx.fillStyle = 'black'; // default #000000
// // 	ctx.fillRect(0, 0, cw, ch);

// // 	// Lines in the middle
// // 	for (let linePosition = 20; linePosition < ch; linePosition += 30) {
// // 		ctx.fillStyle = 'gray';
// // 		ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
// // 	}
// // }

// let topCanvas = canvas.offsetTop;

// function playerPosition(e) {
// 	playerY = e.clientY - topCanvas - paddleHeight / 2;

// 	if (playerY > ch - paddleHeight) {
// 		// >=
// 		playerY = ch - paddleHeight;
// 	}

// 	if (playerY < 0) {
// 		// <=
// 		playerY = 0;
// 	}

// 	// for test
// 	// aiY = playerY;
// }

// function speedUp() {
// 	console.log(`X: ${ballSpeedX}, Y: ${ballSpeedY}`);
// 	// Speed X
// 	if (ballSpeedX > 0 && ballSpeedX < 16) {
// 		ballSpeedX += 0.2;
// 	} else if (ballSpeedX < 0 && ballSpeedX > -16) {
// 		ballSpeedX -= 0.2;
// 	}

// 	// Speed Y
// 	if (ballSpeedY > 0 && ballSpeedY < 16) {
// 		ballSpeedY += 0.2;
// 	} else if (ballSpeedY < 0 && ballSpeedY > -16) {
// 		ballSpeedY -= 0.2;
// 	}
// }

// // AI
// function aiPosition() {
// 	const middlePaddle = aiY + paddleHeight / 2;
// 	const middleBall = ballY + ballSize / 2;

// 	if (ballX > 500) {
// 		if (middlePaddle - middleBall > 200) {
// 			aiY -= 24;
// 		} else if (middlePaddle - middleBall > 50) {
// 			aiY -= 10;
// 		} else if (middlePaddle - middleBall < -200) {
// 			aiY += 24;
// 		} else if (middlePaddle - middleBall < -50) {
// 			aiY += 10;
// 		}
// 	}

// 	if (ballX <= 500 && ballX > 100) {
// 		if (middlePaddle - middleBall > 100) {
// 			aiY -= 3;
// 		}
// 		if (middlePaddle - middleBall < -100) {
// 			aiY += 3;
// 		}
// 	}

// 	if (aiY >= ch - paddleHeight) {
// 		aiY = ch - paddleHeight;
// 	}

// 	if (aiY <= 0) {
// 		aiY = 0;
// 	}
// }

// canvas.addEventListener('mousemove', playerPosition);

// function game() {
// 	table();
// 	ball();
// 	player();
// 	ai();
// 	aiPosition();

// 	if (gameRender === 0) {
// 		location.reload();
// 	}
// }

// let gameRender = setInterval(game, 1000 / 60);














// class Component {
// 	constructor(cw, ch, tag, ctxType) {
// 		this.cw = cw;
// 		this.ch = ch;
// 		this.canvas = document.querySelector(tag);
// 		this.ctx = this.canvas.getContext(ctxType);
// 	}

// 	canvasSize() {
// 		this.canvas.width = this.cw;
// 		this.canvas.height = this.ch;
// 	}
// }

// class Table extends Component {
// 	constructor(cw, ch, tag, ctxType, lineWidth, lineHeight) {
// 		super(cw, ch, tag, ctxType);
// 		this.lineWidth = lineWidth;
// 		this.lineHeight = lineHeight;
// 	}

// 	drawTable() {
// 		// Table
// 		this.ctx.fillStyle = '#195519';
// 		this.ctx.fillRect(0, 0, this.cw, this.ch);

// 		// Lines in the middle
// 		for (let linePosition = 20; linePosition < this.ch; linePosition += 30) {
// 			this.ctx.fillStyle = 'white';
// 			this.ctx.fillRect(
// 				this.cw / 2 - this.lineWidth / 2,
// 				linePosition,
// 				this.lineWidth,
// 				this.lineHeight
// 			);
// 		}
// 	}
// }

// class Ball extends Component {
// 	constructor(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY) {
// 		super(cw, ch, tag, ctxType);
// 		this.ballSize = ballSize;
// 		this.ballX = this.cw / 2 - this.ballSize / 2;
// 		this.ballY = this.ch / 2 - this.ballSize / 2;
// 		this.ballSpeedX = ballSpeedX;
// 		this.ballSpeedY = ballSpeedY;
// 	}

// 	drawBall() {
// 		this.ctx.fillStyle = 'orange';
// 		this.ctx.fillRect(this.ballX, this.ballY, this.ballSize, this.ballSize);

// 		this.ballX += this.ballSpeedX;
// 		this.ballY += this.ballSpeedY;

// 		this.curvesColisionDetection();
// 	}

// 	curvesColisionDetection() {
// 		// Top & bottom curves
// 		if (this.ballY <= 0 || this.ballY + this.ballSize >= this.ch) {
// 			this.ballSpeedY = -this.ballSpeedY;
// 			this.speedUp();
// 		}

// 		// Left & right curves
// 		if (this.ballX <= 0) {
// 			// clearInterval(gameRender);
// 			// gameRender = 0;
// 			// alert('Computer win');
// 		} else if (this.ballX + this.ballSize >= this.cw) {
// 			// clearInterval(gameRender);
// 			// gameRender = 0;
// 			// alert('You win');
// 		}

// 		this.paddlesColision();
// 	}

// 	paddlesColision() {
// 		const paddles = new Paddles(
// 			1000,
// 			500,
// 			'canvas',
// 			'2d',
// 			100,
// 			20,
// 			70,
// 			200,
// 			910,
// 			200
// 		);

// 		// Bounces the ball off the player's pallet
// 		if (
// 			this.ballX <= paddles.playerX + paddles.paddleWidth &&
// 			this.ballY + this.ballSize / 2 >= paddles.playerY &&
// 			this.ballY + this.ballSize / 2 <= paddles.playerY + paddles.paddleHeight
// 		) {
// 			this.ballX += 5;
// 			this.ballSpeedX = -this.ballSpeedX;
// 			this.speedUp();
// 		}

// 		// Ball bounces off the AI pallet
// 		if (
// 			this.ballX + this.ballSize >= paddles.aiX &&
// 			this.ballY + this.ballSize / 2 >= paddles.aiY &&
// 			this.allY + this.ballSize / 2 <= paddles.aiY + paddles.paddleHeight
// 		) {
// 			this.ballX -= 5;
// 			this.ballSpeedX = -this.ballSpeedX;
// 			this.speedUp();
// 		}
// 	}

// 	speedUp() {
// 		console.log(`X: ${this.ballSpeedX}, Y: ${this.ballSpeedY}`);
// 		// Speed X
// 		if (this.ballSpeedX > 0 && this.ballSpeedX < 16) {
// 			this.ballSpeedX += 0.2;
// 		} else if (this.ballSpeedX < 0 && this.ballSpeedX > -16) {
// 			this.ballSpeedX -= 0.2;
// 		}

// 		// SpeedY
// 		if (this.ballSpeedY > 0 && this.ballSpeedY < 16) {
// 			this.ballSpeedY += 0.2;
// 		} else if (this.ballSpeedY < 0 && this.ballSpeedY > -16) {
// 			this.ballSpeedY -= 0.2;
// 		}
// 	}
// }

// class Paddles extends Component {
// 	constructor(cw, ch, tag, ctxType, pH, pW, playerX, playerY, aiX, aiY) {
// 		super(cw, ch, tag, ctxType);
// 		this.paddleHeight = pH;
// 		this.paddleWidth = pW;

// 		this.playerX = playerX;
// 		this.playerY = playerY;

// 		this.aiX = aiX;
// 		this.aiY = aiY;
// 	}

// 	drawPlayerPaddle() {
// 		this.ctx.fillStyle = 'red';
// 		this.ctx.fillRect(
// 			this.playerX,
// 			this.playerY,
// 			this.paddleWidth,
// 			this.paddleHeight
// 		);

// 		this.playerPaddleMove();
// 	}

// 	drawAIPaddle() {
// 		this.ctx.fillStyle = 'blue';
// 		this.ctx.fillRect(this.aiX, this.aiY, this.paddleWidth, this.paddleHeight);
// 	}

// 	playerPaddlePosition(e) {
// 		this.playerY = e.clientY - this.topCanvas - this.paddleHeight / 2;

// 		if (this.playerY >= this.ch - this.paddleHeight) {
// 			this.playerY = this.ch - this.paddleHeight;
// 		}

// 		if (this.playerY <= 0) {
// 			this.playerY = 0;
// 		}
// 	}

// 	playerPaddleMove() {
// 		this.topCanvas = this.canvas.offsetTop;
// 		this.canvas.addEventListener(
// 			'mousemove',
// 			this.playerPaddlePosition.bind(this)
// 		);
// 	}
// }

// // class AI extends Component {
// // 	aiPosition() {
// //     const ball = new Ball(1000, 500, 'canvas', '2d', 20, 4, 4);
// //     const paddles = new Paddles(1000, 500, 'canvas', '2d', 100, 20, 70, 200, 910, 200);

// // 		const middlePaddle = paddles.aiY + paddles.paddleHeight / 2;
// // 		const middleBall = ball.ballY + ball.ballSize / 2;

// // 		if (ball.ballX > 500) {
// // 			if (middlePaddle - middleBall > 200) {
// // 				paddles.aiY -= 24;
// // 			} else if (middlePaddle - middleBall > 50) {
// // 				paddles.aiY -= 10;
// // 			} else if (middlePaddle - middleBall < -200) {
// // 				paddles.aiY += 24;
// // 			} else if (middlePaddle - middleBall < -50) {
// // 				paddles.aiY += 10;
// // 			}
// // 		}

// // 		if (ball.ballX <= 500 && ball.ballX > 100) {
// // 			if (middlePaddle - middleBall > 100) {
// // 				paddles.aiY -= 3;
// // 			}
// // 			if (middlePaddle - middleBall < -100) {
// // 				paddles.aiY += 3;
// // 			}
// // 		}

// // 		if (paddles.aiY >= this.ch - paddles.paddleHeight) {
// // 			paddles.aiY = this.ch - paddles.paddleHeight;
// // 		}

// // 		if (paddles.aiY <= 0) {
// // 			paddles.aiY = 0;
// // 		}
// // 	}
// // }

// export class Game {
// 	gameRender() {
// 		const table = new Table(1000, 500, 'canvas', '2d', 6, 16);
// 		const ball = new Ball(1000, 500, 'canvas', '2d', 20, 4, 4);
//     const paddles = new Paddles(1000, 500, 'canvas', '2d', 100, 20, 70, 200, 910, 200);
//     // const ai = new AI(1000, 500, 'canvas', '2d');

// 		setInterval(() => {
// 			table.canvasSize();
// 			table.drawTable();
// 			ball.drawBall();
// 			paddles.drawPlayerPaddle();
// 			paddles.drawAIPaddle();
//       // ai.aiPosition();
// 		}, 1000 / 60);
// 	}
// }

// // const paddles = new Paddles(1000, 500, 'canvas', '2d', 100, 20, 70, 200, 910, 200);