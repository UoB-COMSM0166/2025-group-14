let oldWindowWidth;
let oldWindowHeight;

let x1;
let y1;
let w = 80;
let h = 50;
// let temp;
// let prevKey = "horisontal";

let angle = 0;


function setup() {
  //set the canvas size the first time when the program starts
  createCanvas(windowWidth, windowHeight);
  oldWindowWidth = windowWidth;
  oldWindowHeight = windowHeight;

  x1 = width / 2;
  y1 = height / 2;
}

function draw() {

  //this function dynamically resizes the canvas to the height and width of the window
  //probably not needed at the moment, but it's nice to have
  ResizeCanvas();

  background(200);
  
  //functions that say:
  //w is forward
  //s is backwards
  //d is rotate clockwise
  //a is rotate anticlockwise
  //w- and sConditionMacros() control corder strike
        //they are very far from perfect -> requre thorough troubleshooting
  //how to implement dual key press, study when have time
        //https://stackoverflow.com/questions/72881145/detect-multiple-keypresses-and-trigger-an-action-once-in-p5-js
  if (keyIsPressed === true) {
    if (key === 'w' && wConditionMacros()) {
      x1 += 3 * cos(angle);
      y1 += 3 * sin(angle);
    } else if (key === 's' && sConditionMacros()) {
      x1 -= 1.5 * cos(angle);
      y1 -= 1.5 * sin(angle);
    } else if (key === 'a') {
      angle -= 0.05;
    } else if (key === 'd') {
      angle += 0.05;
    }
  }

  //some coordinate shift wizardry to keep 
  // the ellipse updating after rotation
  fill(0);
  push();
  translate(x1, y1);
  rotate(angle);
  ellipse(0, 0, w, h);
  pop();

  //add the coordinates of the centre of the ellipse (may be useful later)
  fill(0);
  text(`the center is`, x1 - 40, y1 - 65);
  text(`x: ${Math.floor(x1)} y: ${Math.floor(y1)}`, x1 - 40, y1 - 50);

  //adds a little white circle that rotates with the boat
  //to shows the direction of the boat
  fill(256);
  circle(x1 + 40 * cos(angle), y1 + 40 * sin(angle), 5);

  //add some black straight lines that would play the role of the canal border (in the early stage)
  fill(0);
  strokeWeight(3);
  text(`line height: ${Math.floor(height/3)}`, 20, height/3 - 5);
  line(0, height/3, width, height/3);
  text(`line height: ${Math.floor(height*2/3)}`, 20, height*2/3 - 5);
  line(0, height*2/3, width, height*2/3);

  //alternative boat control code

  // if (keyIsPressed === true) {
  //   if (key === 'w' && y1 > height/3 + 40) {
  //     chngDirShape();
  //     y1 -= 2;
  //   } else if (key === 's' && y1 < height*2/3 - 40) {
  //     chngDirShape();
  //     y1 += 2;
  //   } else if (key === 'a') {
  //     chngDirShape();
  //     x1 -= 2;
  //   } else if (key === 'd') {
  //     chngDirShape();
  //     x1 += 2;
  //   }
  // }
  // 
  // ellipse(x1, y1, w, h);
}

function ResizeCanvas() {
  // create a dinamically resizable canvas
  if (oldWindowWidth != windowWidth || oldWindowHeight != windowHeight){
    createCanvas(windowWidth, windowHeight);
    oldWindowWidth = windowWidth;
    oldWindowHeight = windowHeight;
  }
}

function wConditionMacros() {
  if (y1 + 40 * sin(angle) > height/3 && y1 + 40 * sin(angle) < height*2/3){
    return true;
  } else {
    return false;
  }
}

function sConditionMacros() {
  if (y1 - 40 * sin(angle) > height/3 && y1 - 40 * sin(angle) < height*2/3){
    return true;
  } else {
    return false;
  }
}


// function chngDirShape() {
//   if (prevKey === "horisontal" && (key === 'w' || key === 's')){
//     chngShape()
//     prevKey = "vertical";
//   }
//   else if (prevKey === "vertical" && (key === 'a' || key === 'd')){
//     chngShape()
//     prevKey = "horisontal";
//   }
// }


// function chngShape() {
//   temp = w;
//   w = h;
//   h = temp;
// }

