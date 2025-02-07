//global variables
const canvasSize = 700;
const canalWidth = 400;



let c1 = new canal(canalWidth, "Starter", 0, 200, canvasSize, 200, null, null, canvasSize);

//boat variables from left to right: Speed, starting X coordinate, starting Y coordinate, width, height

let b = new boat(2, 5, 300, 60, 30);
b.setCanal(c1);

function setup(){
    createCanvas(canvasSize, canvasSize);

}

function draw(){
    background(200);

    c1.visualize();

    b.visualize();
   

}