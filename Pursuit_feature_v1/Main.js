let pursuer;
let target;

function setup() {
  createCanvas(400, 400);
  canal = new Canal(300, 100);
  pursuer = new Pursuer(100, 100);
  player = new Player(width/2, height/2, canal);
}

function draw() {
  background(0);

  canal.show();

  player.move();
  player.show();

  let steering = pursuer.arrive(player);
  pursuer.applyForce(steering);
  pursuer.update();
  pursuer.show();
}