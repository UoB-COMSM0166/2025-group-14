let x1;
let y1;
let w = 80;
let h = 50;
let temp;
let prevKey = "horisontal";
let move = 5


function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  x1 = width / 2;
  y1 = height / 2;
}

function draw() {
  keyPressed();
  fill(0);
  ellipse(x1, y1, w, h);
  boundary(130, 320, 885, 475);
}

function keyPressed() {
  background(200);
  // Update x and y if a key is pressed.
  if (keyIsPressed === true) {
    if (key === 'ArrowUp') {
      chngDirShape();
      y1 -= move;
    } 
    else if (key === 'ArrowDown') {
      chngDirShape();
      y1 += move;
    } 
    else if (key === 'ArrowLeft') {
      chngDirShape();
      x1 -= move;
    } 
    else if (key === 'ArrowRight') {
      chngDirShape();
      x1 += move;
    }
  }
}

function chngDirShape() {
  if (prevKey === "horisontal" && (key === 'ArrowUp' || key === 'ArrowDown')){
    chngShape()
    prevKey = "vertical";
  }
  else if (prevKey === "vertical" && (key === 'ArrowLeft' || key === 'ArrowRight')){
    chngShape()
    prevKey = "horisontal";
  }
}

function chngShape() {
  temp = w;
  w = h;
  h = temp;
}

function boundary(x1, y1, x2, y2) {
  line(130, 320, 885, 475);
}