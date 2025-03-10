let pursuer;
let player;
let canal;

function setup() {
  createCanvas(400, 400);
  canal = new Canal(300, 100);
  pursuer = new Pursuer(100, 100, canal);
  player = new Player(width/2, height/2, 10, 3);
}

function draw() {
  background(0);

  // Draw the canal
  canal.show();

  // Draw and update movement of the player
  player.show();

  // Calculate steering of pursuer based on player movement and use to update
  // locomotion. Draw pursuer.
  let steering = pursuer.arrive(player);
  pursuer.applyForce(steering);
  pursuer.update();
  pursuer.show();
}