let ball, floor;

function setup() {
	new Canvas(windowWidth, windowHeight);
	world.gravity.y = 5;

	ball = new Sprite();
	ball.diameter = 50;
	ball.y = 30;

	floor = new Sprite();
	floor.y = 190;
	floor.w = 238;
	floor.h = 5;
	floor.collider = 'static';
  floor.rotation = 2;
}

function draw() {
  clear();
}
