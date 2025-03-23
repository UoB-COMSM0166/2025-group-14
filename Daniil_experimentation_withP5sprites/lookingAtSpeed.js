let ball, floor;

function setup() {
	new Canvas(windowWidth, windowHeight);
	// world.gravity.y = 5;

  player = new Sprite(windowWidth / 2, windowHeight / 2, 25, 50);
  player.maxSpeed = 5;
  // player.friction = 10;
  player.drag = 2;
  player.bounciness = 1.3;
  player.colour = 'green'; 
  // player.collider = 'kinematic';


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
  if (kb.pressing('left')) player.applyForce(-20, 0);
  else if (kb.pressing('right')) player.applyForce(20, 0);
  if (kb.pressing('up')) player.applyForce(0, -20);
  else if (kb.pressing('down')) player.applyForce(0, 20);

  let v = createVector(player.vel.x, player.vel.y);
  let heading = v.heading();
  player.rotation = heading;

  

  if (frameCount % 60 === 0){
    console.log(player.vel.x);
    // console.log(player.y);
  }

  clear();
}
