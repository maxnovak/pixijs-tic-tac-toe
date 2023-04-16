import { Application, Container, FederatedPointerEvent, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});

const onClick = (_: FederatedPointerEvent): void => {
	tintImage(0);
}

const tintImage = (index: number) => {
	setTimeout(() => {
		clampy.tint = 0xFFFFFF - index;
		if (index < 255) {
			tintImage(index+1)
		}
	}, 20);
}

const container = new Container();
container.x = 400;
container.y = 0;
app.stage.addChild(container);

const clampy = Sprite.from("clampy.png");
clampy.x = -300;
clampy.y = 100;
container.addChild(clampy);
clampy.on("pointertap", onClick)
clampy.interactive = true;
