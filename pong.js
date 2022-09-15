class Component {
	constructor(cw, ch, tag, ctxType) {
		this.cw = cw;
		this.ch = ch;
		this.canvas = document.querySelector(tag);
		this.ctx = this.canvas.getContext(ctxType);
	}

	canvasSize() {
		this.canvas.width = this.cw;
		this.canvas.height = this.ch;
	}
}

class Table extends Component {
	constructor(cw, ch, tag, ctxType, lineWidth, lineHeight) {
		super(cw, ch, tag, ctxType);
		this.lineWidth = lineWidth;
		this.lineHeight = lineHeight;
	}

	drawTable() {
		// Table
		this.ctx.fillStyle = '#195519';
		this.ctx.fillRect(0, 0, this.cw, this.ch);

		// Lines in the middle
		for (let linePosition = 20; linePosition < this.ch; linePosition += 30) {
			this.ctx.fillStyle = 'white';
			this.ctx.fillRect(
				this.cw / 2 - this.lineWidth / 2,
				linePosition,
				this.lineWidth,
				this.lineHeight
			);
		}
	}
}

class Ball extends Component {
	constructor(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY) {
		super(cw, ch, tag, ctxType);
		this.ballSize = ballSize;
		this.ballX = this.cw / 2 - this.ballSize / 2;
		this.ballY = this.ch / 2 - this.ballSize / 2;
		this.ballSpeedX = ballSpeedX;
		this.ballSpeedY = ballSpeedY;
	}

	drawBall() {
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(this.ballX, this.ballY, this.ballSize, this.ballSize);

		this.ballX += this.ballSpeedX;
		this.ballY += this.ballSpeedY;

		this.curvesColisionDetection();
	}

	curvesColisionDetection() {
		// Top & bottom curves
		if (this.ballY <= 0 || this.ballY + this.ballSize >= this.ch) {
			this.ballSpeedY = -this.ballSpeedY;
			this.speedUp();
		}

		// Left & right curves
		if (this.ballX <= 0) {
			// clearInterval(gameRender);
			// gameRender = 0;
			// alert('Computer win');
		} else if (this.ballX + this.ballSize >= this.cw) {
			// clearInterval(gameRender);
			// gameRender = 0;
			// alert('You win');
		}
	}

	speedUp() {
		console.log(`X: ${this.ballSpeedX}, Y: ${this.ballSpeedY}`);
		// Speed X
		if (this.ballSpeedX > 0 && this.ballSpeedX < 16) {
			this.ballSpeedX += 0.2;
		} else if (this.ballSpeedX < 0 && this.ballSpeedX > -16) {
			this.ballSpeedX -= 0.2;
		}

		// SpeedY
		if (this.ballSpeedY > 0 && this.ballSpeedY < 16) {
			this.ballSpeedY += 0.2;
		} else if (this.ballSpeedY < 0 && this.ballSpeedY > -16) {
			this.ballSpeedY -= 0.2;
		}
	}
}

class Paddles extends Component {
	constructor(cw, ch, tag, ctxType, pH, pW, playerX, playerY, aiX, aiY) {
		super(cw, ch, tag, ctxType);
		this.paddleHeight = pH;
		this.paddleWidth = pW;

		this.playerX = playerX;
		this.playerY = playerY;

		this.aiX = aiX;
		this.aiY = aiY;
	}

	drawPlayerPaddle() {
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(
			this.playerX,
			this.playerY,
			this.paddleWidth,
			this.paddleHeight
		);

		this.playerPaddleMove();
	}

	drawAIPaddle() {
		this.ctx.fillStyle = 'blue';
		this.ctx.fillRect(this.aiX, this.aiY, this.paddleWidth, this.paddleHeight);
	}

	playerPaddlePosition(e) {
		this.playerY = e.clientY - this.topCanvas - this.paddleHeight / 2;

		if (this.playerY >= this.ch - this.paddleHeight) {
			this.playerY = this.ch - this.paddleHeight;
		}

		if (this.playerY <= 0) {
			this.playerY = 0;
		}
	}

	playerPaddleMove() {
		this.topCanvas = this.canvas.offsetTop;
		this.canvas.addEventListener(
			'mousemove',
			this.playerPaddlePosition.bind(this)
		);
	}
}

class Colision extends Ball {
	constructor(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY, playerX, playerY, aiX, aiY, paddleWidth, paddleHeight) {
		super(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY);
    this.playerX = playerX;
    this.playerY = playerY;
    this.aiX = aiX;
    this.aiY = aiY;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
	}

  paddlesColision() {
		// Bounces the ball off the player's pallet
		if (
			this.ballX <= this.playerX + this.paddleWidth &&
			this.ballY + this.ballSize / 2 >= this.playerY &&
			this.ballY + this.ballSize / 2 <= this.playerY + this.paddleHeight
		) {
			this.ballX += 5;
			this.ballSpeedX = -this.ballSpeedX;
			this.speedUp();
		}

		// Ball bounces off the AI pallet
		if (
			this.ballX + this.ballSize >= this.aiX &&
			this.ballY + this.ballSize / 2 >= this.aiY &&
			this.allY + this.ballSize / 2 <= this.aiY + this.paddleHeight
		) {
			this.ballX -= 5;
			this.ballSpeedX = -this.ballSpeedX;
			this.speedUp();
		}
	}
}

class AI extends Ball {
	constructor(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY, playerX, playerY, aiX, aiY, paddleWidth, paddleHeight) {
		super(cw, ch, tag, ctxType, ballSize, ballSpeedX, ballSpeedY);
    this.playerX = playerX;
    this.playerY = playerY;
    this.aiX = aiX;
    this.aiY = aiY;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
	}

	aiPosition() {
		const middlePaddle = this.aiY + this.paddleHeight / 2;
		const middleBall = this.ballY + this.ballSize / 2;

		if (this.ballX > 500) {
			if (middlePaddle - middleBall > 200) {
				this.aiY -= 24;
			} else if (middlePaddle - middleBall > 50) {
				this.aiY -= 10;
			} else if (middlePaddle - middleBall < -200) {
				this.aiY += 24;
			} else if (middlePaddle - middleBall < -50) {
				this.aiY += 10;
			}
		}

		if (this.ballX <= 500 && this.ballX > 100) {
			if (middlePaddle - middleBall > 100) {
				this.aiY -= 3;
			}
			if (middlePaddle - middleBall < -100) {
				this.aiY += 3;
			}
		}

		if (this.aiY >= this.ch - this.paddleHeight) {
			this.aiY = this.ch - this.paddleHeight;
		}

		if (this.aiY <= 0) {
			this.aiY = 0;
		}
	}
}

export class Game {
	gameRender() {
		const table = new Table(1000, 500, 'canvas', '2d', 6, 16);
		const ball = new Ball(1000, 500, 'canvas', '2d', 20, -3, 4);
		const paddles = new Paddles(
			1000,
			500,
			'canvas',
			'2d',
			100,
			20,
			70,
			200,
			910,
			200
		);
    const colision = new Colision(1000, 500, 'canvas', '2d', 20, 4, 4, 70, 200, 910, 200, 20, 100);
    const ai = new AI(1000, 500, 'canvas', '2d', 20, 4, 4, 70, 200, 910, 200, 20, 100);

		setInterval(() => {
			table.canvasSize();
			table.drawTable();
			ball.drawBall();
			paddles.drawPlayerPaddle();
			paddles.drawAIPaddle();
      colision.paddlesColision();
			ai.aiPosition();
		}, 1000 / 60);
	}
}

// const paddles = new Paddles(1000, 500, 'canvas', '2d', 100, 20, 70, 200, 910, 200);
