// let eraserMode = false;

// function setup() {
//   createCanvas(800, 600);
//   background(220);
//   textStyle(BOLD);
//   text("Select Colour", 20, 20);
//   text("Hold backspace to erase", 600, 20);
//   myPicker = createColorPicker('deeppink');
//   myPicker.position(30,30);
  
//   // Select brush size
//   slider = createSlider(1, 20, 10);
//   slider.position(115, height);
// }

// function draw() {
//   let c = myPicker.value();
  
//   // Check if eraser is enabled
//   if(keyIsPressed && keyCode == BACKSPACE){
//     eraserMode = true;
//   } else {
//     eraserMode = false;
//   }
  
//   // Eraser mode - erases when holding backspace
//   if(eraserMode){
//     noStroke();
//     fill(220);
//     ellipse(mouseX, mouseY, slider.value(), slider.value());
//   }
  
//   // Draw mode
//   if(mouseIsPressed && eraserMode == false){
//     noStroke();
//     fill(c);
//     ellipse(mouseX, mouseY, slider.value(), slider.value());
//   }
// }
