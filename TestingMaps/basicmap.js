class canal{
    constructor(width, color, startX, startY, endX, endY){
        this.width = width;
        this.colour = color;
        this.start = [startX, startY];
        this.end = [endX, endY];

        //draw barriers
        let a = angleCalc(startX, startY, endX, endY);
        this.opp = Math.sin(a) * width;
        this.adj = Math.cos(a) * width;

        this.bank1grad = gradient(this.start[0], this.start[1], this.end[0], this.end[1]);
        this.bank2grad = gradient(this.start[0] + this.opp, this.start[1] + this.adj, this.end[0] + this.opp, this.end[1] + this.adj);



    }

    visualize(){

        stroke("red");//test
        line(this.start[0], this.start[1], this.end[0], this.end[1]);
        stroke("red");//test
        line(this.start[0] + this.opp, this.start[1] + this.adj, this.end[0] + this.opp, this.end[1] + this.adj);
        text(this.bank1grad, 50, 50);
 
    }

}

class boat{
    constructor(canal, size, speed){
        this.canal = canal;
        this.size = size;
        this.speed = speed;

        //starting position
        let a = angleCalc(this.canal.start[0], this.canal.start[1], this.canal.end[0], this.canal.end[1]);
        let opp = Math.sin(a) * this.canal.width;
        let adj = Math.cos(a) * this.canal.width;

        this.x = this.canal.start[0] + (opp/2);
        this.y = this.canal.start[1] + (adj/2);

    }

    move(){
        let s = this.speed;
        fill("purple");
        circle(this.x, this.y, this.size);
        circle(this.canal.end[0], this.canal.end[1], 5);
        if(keyIsPressed){
            if(key === 'w'){
                this.y -= s;
            }
            if(key === 's'){
                this.y += s;
            }
            if(key === 'd'){
                this.x += s;
            }
            if(key === 'a'){
                this.x -= s;
            }
        }
        

    }

}


//general functions
function angleCalc(startX, startY, endX, endY){
    let opp = endY - startY;
    let adj = startX-endX;
    let tanoutp = opp/adj;
    return Math.atan(tanoutp);

} 

function gradient(x1, y1, x2, y2){
    return (y2 - y1)/(x2 - x1);
}

//front of house


let c1 = new canal(60, "blue", 200, 200, 300, 300);
let c2 = new canal(60, "blue", 300, 300, 330, 500);
let b = new boat(c2, 20, 2);

function setup(){
    createCanvas(700, 700);

  

}

function draw(){
    background("green");

    c1.visualize();


    c2.visualize();
    b.move();
   

}