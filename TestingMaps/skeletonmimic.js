//global variables
const canvasSize = 700;
const canalWidth = 400;



let c1 = new canal(canalWidth, "Starter", 0, 200, canvasSize, 200, null, null);

//boat variables from left to right: Speed, 

let b = new boat(2, 5, 300, 60, 30, canvasSize);
b.setCanal(c1);

function setup(){
    createCanvas(canvasSize, canvasSize);

}

function draw(){
    background(200);

    c1.visualize();

    b.visualize();
   

}