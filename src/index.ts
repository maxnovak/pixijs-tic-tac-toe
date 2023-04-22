import { Application, Container, FederatedPointerEvent, Sprite } from 'pixi.js'

const Symbols = {
	NOTHING: 0,
	X: 1,
	O: 2,
}

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	// autoDensity: true,
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

const onClick = (e: FederatedPointerEvent): void => {
	const x = getXLocation(e.screenX);
	const y = getYLocation(e.screenY);

	// Null safety is to allow getters to return -1
	if (grid[y]?.[x] === Symbols.NOTHING) {
		grid[y][x] = turn;
	}

	console.log(grid);
}

const container = new Container();
app.stage.addChild(container);

const board = Sprite.from("board.png");
container.addChild(board);
board.on("pointertap", onClick)
board.interactive = true;


const getXLocation = (x: number): number => {
	if (x > 150 && x < 350) {
		return 0;
	}
	if (x > 360 && x < 635) {
		return 1;
	}
	if (x > 640 && x < 830) {
		return 2;
	}
	return -1;
}

const getYLocation = (y: number): number => {
	if (y > 20 && y < 130) {
		return 0;
	}
	if (y > 150 && y < 325) {
		return 1;
	}
	if (y > 350 && y < 490) {
		return 2;
	}
	return -1;
}