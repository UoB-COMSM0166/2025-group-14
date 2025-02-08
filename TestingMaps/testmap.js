//global variables
const canvasSize = 700;
const canalWidth = 60;


//front of House

let c1 = new canal(canalWidth, "Starter", 200, 300, 300, 400, null, null);
let c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600, null, null);
let c3 = new canal(canalWidth, "ThirdElement", 200, 500, 450, 500, null, null);
let c4 = new canal(canalWidth, "Uphill", 450, 400, 600, 100, null, null);
let c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150, null, null);
c1.setConnections(null, c2);
c2.setConnections(c1, c3);
c3.setConnections(c2, c4);
c4.setConnections(c3, c5);
c5.setConnections(c4, null);
let b = new boat(2, 178.78679656440357, 221.21320343559643, 10, 20);
b.setCanal(c1);

function setup(){
    createCanvas(canvasSize, canvasSize);

}

function draw(){
    background("green");

    c1.visualize();
    c2.visualize();
    c3.visualize();
    c4.visualize();
    c5.visualize();

    //c1.afterThreshold.visualize();

    b.visualize();
   

}