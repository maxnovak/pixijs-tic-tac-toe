import { Application, Container, FederatedPointerEvent, ObservablePoint, Sprite } from 'pixi.js'
import { getXLocation, getYLocation } from './utils';

const Symbols = {
	NOTHING: 0,
	X: 1,
	O: 2,
}

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#FFFFFF',
	antialias: true,
	width: 900,
});

let turn = Symbols.X;

let grid = [
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
];
let location = [
	[[237,85],[498,84],[730,74]],
	[[238,252],[481,236],[751,229]],
	[[274,444],[494,434],[764,421]],
];


const onClick = (e: FederatedPointerEvent): void => {
	const x = getXLocation(e.screenX);
	const y = getYLocation(e.screenY);

	// Null safety is to allow getters to return -1
	if (grid[y]?.[x] === Symbols.NOTHING) {
		grid[y][x] = turn;
		let move: Sprite;
		if (turn === Symbols.X) {
			move = Sprite.from("x.png");
			console.log(checkWinX(x,y));
		} else if (turn === Symbols.O) {
			move = Sprite.from("o.png");
			console.log(checkWinY(x,y));
		} else {
			return;
		}
		move.x = location[y][x][0] - 50 + Math.random() * 30;
		move.y = location[y][x][1] - 75 + Math.random() * 30;
		move.scale = new ObservablePoint(()=>{}, null, 0.25, 0.25);
		app.stage.addChild(move);
		console.log(move);
	}
	swapTurns();
	
}

const container = new Container();
app.stage.addChild(container);

const board = Sprite.from("board.png");
container.addChild(board);
board.on("pointertap", onClick)
board.interactive = true;


let xRow = [0,0,0];
let xColumn =[0,0,0];
let xLeftDiagonal = 0;
let xRightDiagonal = 0;

const checkWinX = (x: number, y: number): boolean => {
	xRow[x]++;
	xColumn[y]++;
	if (x === y) xLeftDiagonal++;
	if (x+y === 2) xRightDiagonal++;
	if (xRow[x] === 3 || xColumn[y] === 3 || xLeftDiagonal === 3 || xRightDiagonal === 3) {
		return true;
	}
	return false;
}

let yRow = [0,0,0];
let yColumn =[0,0,0];
let yLeftDiagonal = 0;
let yRightDiagonal = 0;

const checkWinY = (x: number, y: number): boolean => {
	yRow[x]++;
	yColumn[y]++;
	if (x === y) yLeftDiagonal++;
	if (x+y === 2) yRightDiagonal++;
	if (yRow[x] === 3 || yColumn[y] === 3 || yLeftDiagonal === 3 || yRightDiagonal === 3) {
		return true;
	}
	return false;
}

const swapTurns = () => {
	if (turn === Symbols.X) {
		turn = Symbols.O;
		return;
	}
	if (turn === Symbols.O) {
		turn = Symbols.X;
		return;
	}
}