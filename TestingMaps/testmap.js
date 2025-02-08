//global variables
const canvasSize = 700;
const canalWidth = 60;


//front of House

let c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450);
let c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600);
let c3 = new canal(canalWidth*2, "ThirdElement", 200, 430, 550, 560);
let c4 = new canal(canalWidth/2, "Uphill", 550, 400, 600, 100);
let c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150);
let c6 = new canal(canalWidth, "victory", 100, 150, 200, 300)
c1.setConnections(c6, c2);
c2.setConnections(c1, c3);
c3.setConnections(c2, c4);
c4.setConnections(c3, c5);
c5.setConnections(c4, c6);
c6.setConnections(c5, c1)
let b = new boat(2, c1, 220, 330, 10, 20);


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
    c6.visualize();
    //c1.afterThreshold.visualize();

    b.visualize();
   

}