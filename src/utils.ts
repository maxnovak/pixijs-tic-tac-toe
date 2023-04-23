export const getXLocation = (x: number): number => {
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

export const getYLocation = (y: number): number => {
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