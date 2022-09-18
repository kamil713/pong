const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const cw = canvas.width;
const ch = canvas.height;

class Table {
	constructor() {
		this.position = {
			x: 0,
			y: 0,
		};

		this.width = cw;
		this.height = ch;
	}

	draw() {
		// Table
		c.fillStyle = 'green';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);

		// Lines in the middle
		for (let linePosition = 10; linePosition < ch; linePosition += 30) {
			c.fillStyle = 'white';
			c.fillRect(cw / 2 - 8 / 2, linePosition, 8, 18);
		}
	}
}

class Paddle {
	constructor({ x, y, width, height }) {
		this.position = {
			x,
			y,
		};

		this.width = width;
		this.height = height;
	}

	draw() {
		c.fillStyle = 'white';
		c.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}

class Ball {
	constructor() {
		this.ballSize = 25;

		this.position = {
			x: cw / 2 - this.ballSize / 2,
			y: ch / 2 - this.ballSize / 2,
		};

		this.speed = 0.2;
		this.velocity = {
			x: 4,
			y: 4,
		};

		this.image = createImage('./img/ball.png');
	}

	speedUp() {
		// Speed X
		if (this.velocity.x > 0 && this.velocity.x < 16) {
			this.velocity.x += this.speed;
		} else if (this.velocity.x < 0 && this.velocity.x > -16) {
			this.velocity.x -= this.speed;
		}

		// Speed Y
		if (this.velocity.y > 0 && this.velocity.y < 16) {
			this.velocity.y += this.speed;
		} else if (this.velocity.y < 0 && this.velocity.y > -16) {
			this.velocity.y -= this.speed;
		}
	}

	draw() {
		c.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.ballSize,
			this.ballSize
		);
	}

	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

export class Game {
	render() {
		init();
		animate();

		setInterval(aiPosition, 1000 / 60);
	}
}

function createImage(imageSrc) {
	const image = new Image();
	image.src = imageSrc;
	return image;
}

let table;
let ball;
let paddles = [];

function init() {
	table = new Table();
	ball = new Ball();

	paddles = [
		new Paddle({ x: 30, y: ch / 2 - 50, width: 20, height: 100 }),
		new Paddle({ x: 974, y: ch / 2 - 50, width: 20, height: 100 }),
	];
}

function aiPosition() {
	const aiPaddle = paddles[1];

	const middlePaddle = aiPaddle.position.y + aiPaddle.height / 2;
	const middleBall = ball.position.y + ball.ballSize / 2;

	if (ball.position.x > 512) {
		if (middlePaddle - middleBall > 200) {
			aiPaddle.position.y -= 28;
		} else if (middlePaddle - middleBall > 50) {
			aiPaddle.position.y -= 14;
		} else if (middlePaddle - middleBall < -200) {
			aiPaddle.position.y += 28;
		} else if (middlePaddle - middleBall < -50) {
			aiPaddle.position.y += 14;
		}
	}

	if (ball.position.x <= 512 && ball.position.x > 100) {
		if (middlePaddle - middleBall > 100) {
			aiPaddle.position.y -= 7;
		}
		if (middlePaddle - middleBall < -100) {
			aiPaddle.position.y += 7;
		}
	}

	if (aiPaddle.position.y >= ch - aiPaddle.height) {
		aiPaddle.position.y = ch - aiPaddle.height;
	}

	if (aiPaddle.position.y <= 0) {
		aiPaddle.position.y = 0;
	}
}

function animate() {
	requestAnimationFrame(animate);
	table.draw();
	ball.update();

	paddles.forEach((paddle) => {
		paddle.draw();
	});

	// Curves collision detection (Top - Bottom)
	if (ball.position.y <= 0 || ball.position.y + ball.ballSize >= ch) {
		ball.velocity.y = -ball.velocity.y;
		ball.speedUp();
	}

	// Paddles collision detection (Left - Right)
	if (
		ball.position.x <= paddles[0].position.x + paddles[0].width &&
		ball.position.y + ball.ballSize / 2 >= paddles[0].position.y &&
		ball.position.y + ball.ballSize / 2 <= paddles[0].position.y + paddles[0].height
	) {
		// ball.position.x += 5;
		ball.velocity.x = -ball.velocity.x;
		ball.speedUp();
	}

	if (
		ball.position.x + ball.ballSize >= paddles[1].position.x &&
		ball.position.y + ball.ballSize / 2 >= paddles[1].position.y &&
		ball.position.y + ball.ballSize / 2 <= paddles[1].position.y + paddles[1].height
	) {
		// ball.position.x -= 5;
		ball.velocity.x = -ball.velocity.x;
		ball.speedUp();
	}

	// Win condition
	if (ball.position.x + ball.ballSize >= cw) {
		alert('You win');
		init();
	}

	// Lose condition
	if (ball.position.x <= 0) {
		alert('You lose');
		init();
	}
}

// Mouse control logic
let topCanvas = canvas.offsetTop;

canvas.addEventListener('mousemove', function (e) {
	const playerPaddle = paddles[0];

	playerPaddle.position.y = e.clientY - topCanvas - playerPaddle.height / 2;

	if (playerPaddle.position.y >= ch - playerPaddle.height) {
		playerPaddle.position.y = ch - playerPaddle.height;
	}

	if (playerPaddle.position.y <= 0) {
		playerPaddle.position.y = 0;
	}
});