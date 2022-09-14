const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

function table() {
	// Table
	ctx.fillStyle = 'black'; // default #000000
	ctx.fillRect(0, 0, cw, ch);
	// Lines in the middle
	ctx.fillStyle = 'white';
	ctx.fillRect(100, 100, 200, 200);
}

table();
