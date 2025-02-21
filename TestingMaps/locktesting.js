//global variables
const canvasSize = 700;
const canalWidth = 60;

let l = new lock(canalWidth, "Crossbar", 500, 150, 150, 300);
let intro = new canal(canalWidth, "intro", 600, 100, 500, 150);
let b = new boat(2, l, 10, 3);

function setup(){
    createCanvas(canvasSize, canvasSize);
}

function draw(){
    background("green");
    intro.visualize();
    l.visualize();
    b.visualize();
    ellipse(frameCount%canvasSize, 50, 80, 40);
}