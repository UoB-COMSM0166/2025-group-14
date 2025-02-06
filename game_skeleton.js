let oldWindowWidth;
let oldWindowHeight;

let x1;
let y1;
let w = 80;
let h = 50;
let temp;
let prevKey = "horisontal";


function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  x1 = width / 2;
  y1 = height / 2;
}

function draw() {

  background(200);
  // Update x and y if a key is pressed.
  if (keyIsPressed === true) {
    if (key === 'w' && y1 > height/3 + 40) {
      chngDirShape();
      y1 -= 2;
    } else if (key === 's' && y1 < height*2/3 - 40) {
      chngDirShape();
      y1 += 2;
    } else if (key === 'a') {
      chngDirShape();
      x1 -= 2;
    } else if (key === 'd') {
      chngDirShape();
      x1 += 2;
    }
  }
mod
  fill(0);

  ellipse(x1, y1, w, h);

  strokeWeight(3);
  line(0, height/3, width, height/3);
  line(0, height*2/3, width, height*2/3);
}

function chngDirShape() {
  if (prevKey === "horisontal" && (key === 'w' || key === 's')){
    chngShape()
    prevKey = "vertical";
  }
  else if (prevKey === "vertical" && (key === 'a' || key === 'd')){
    chngShape()
    prevKey = "horisontal";
  }
}

function chngShape() {
  temp = w;
  w = h;
  h = temp;
}

