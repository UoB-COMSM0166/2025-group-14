
//global variables
const canvasSize = 700;
const canalWidth = 60;
let c1, c2, c3, c4, c5, c6, b;  

function setup(){
    createCanvas(canvasSize, canvasSize);
    //front of House
    c1 = new canal(canalWidth, "Starter", 200, 300, 400, 450);
    c2 = new canal(canalWidth, "Steep", 250, 350, 330, 600);
    c3 = new canal(canalWidth, "ThirdElement", 200, 500, 550, 620);
    c4 = new canal(canalWidth, "Uphill", 550, 400, 600, 100);
    c5 = new canal(canalWidth, "Crossbar", 600, 150, 100, 150);
    c6 = new canal(canalWidth, "victory", 100, 150, 200, 300)
    c1.setConnections(c6, c2);
    c2.setConnections(c1, c3);
    c3.setConnections(c2, c4);
    c4.setConnections(c3, c5);
    c5.setConnections(c4, c6);
    c6.setConnections(c5, c1)
    b = new boat(2, c1, 220, 330, 10, 20);
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