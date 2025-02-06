let x1;
let y1;
let w = 80;
let h = 50;
let temp;
let prevKey = "horisontal";


function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);

  x1 = width / 2;
  y1 = height / 2;
}

function draw() {
  background(200);
  // Update x and y if a key is pressed.
  if (keyIsPressed === true) {
    if (key === 'ArrowUp') {
      chngDirShape();
      y1 -= 2;
    } else if (key === 'ArrowDown') {
      chngDirShape();
      y1 += 2;
    } else if (key === 'ArrowLeft') {
      chngDirShape();
      x1 -= 2;
    } else if (key === 'ArrowRight') {
      chngDirShape();
      x1 += 2;
    }
  }
  fill(0);

  ellipse(x1, y1, w, h);
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

