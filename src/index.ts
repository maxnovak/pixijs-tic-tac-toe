import { Application, Container, FederatedPointerEvent, ObservablePoint, Sprite, Text } from 'pixi.js'
import { Sound } from "@pixi/sound";
import { getXLocation, getYLocation, swapTurns } from './utils';
import { Symbols, textStyle } from './constants';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#FFFFFF',
	antialias: true,
	width: 900,
});

const backgroundMusic = Sound.from({
	url: "forest-lullaby-110624.mp3",
	preload: true,
	autoPlay: true,
	loop: true,
	volume: 0.05,
});
backgroundMusic.play();

let turn = Symbols.X;

let grid = [
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
	[Symbols.NOTHING,Symbols.NOTHING,Symbols.NOTHING],
];
const location = [
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
			if (checkWinX(x,y)) {
				const text = new Text('X Wins!', textStyle);
				app.stage.addChild(text);
			}
		} else if (turn === Symbols.O) {
			move = Sprite.from("o.png");
			if (checkWinY(x,y)) {
				const text = new Text('O Wins!', textStyle);
				app.stage.addChild(text);
			}
		} else {
			return;
		}
		move.x = location[y][x][0] - 50 + Math.random() * 30;
		move.y = location[y][x][1] - 75 + Math.random() * 30;
		move.scale = new ObservablePoint(()=>{}, null, 0.25, 0.25);
		app.stage.addChild(move);

		const tileSoundNumber = Math.floor(Math.random() * 12 + 1);
		const tilePlace = Sound.from({
			url: `tile_placement_sounds/tile_placement-${tileSoundNumber}.wav`,
		});
		tilePlace.play();
		turn = swapTurns(turn);
	}
	
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
