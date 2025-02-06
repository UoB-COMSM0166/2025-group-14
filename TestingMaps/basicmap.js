class canal{
    constructor(width, color, startX, startY, endX, endY, connection){
        this.width = width;
        this.colour = color;
        this.redBankStartX = startX;
        this.redBankStartY = startY;
        this.redBankEndX = endX;
        this.redBankEndY = endY
        this.connection = connection

        this.start = [startX, startY];
        this.end = [endX, endY];

        //calculate blankBank
        let a = angleCalc(startX, startY, endX, endY);
        this.opp = Math.sin(a) * width;
        this.adj = Math.cos(a) * width;

        this.blackBankStartX = startX + this.opp;
        this.blackBankStartY = startY + this.adj;
        this.blackBankEndX = endX + this.opp;
        this.blackBankEndY = endY + this.adj;


        this.redBankGrad = gradient(startX, startY, endX, endY);
        console.log("rbg " + this.redBankGrad);
        
        this.redBankOffset = -1 * ((this.redBankGrad * this.redBankStartX) - this.redBankStartY);
        console.log("input test " + this.blackBankEndX);

        this.blackBankGrad = gradient(this.blackBankStartX, this.blackBankStartY, this.blackBankEndX, this.blackBankEndY);
        console.log("setting bbg " + this.blackBankGrad);
        this.blackBankOffset = -1 * ((this.blackBankGrad * this.blackBankStartX) - this.blackBankStartY);

        this.bank2grad = gradient(this.start[0] + this.opp, this.start[1] + this.adj, this.end[0] + this.opp, this.end[1] + this.adj);

        //calculate offsets
        this.bank1off = -1 * ((this.bank1grad * startX) - startY);



    }

    visualize(){

        stroke("red");//test
        line(this.start[0], this.start[1], this.end[0], this.end[1]);
        stroke("black");//test
        line(this.start[0] + this.opp, this.start[1] + this.adj, this.end[0] + this.opp, this.end[1] + this.adj);

 
 
    }

}

class boat{
    constructor(canal, size, speed){
        this.canal = canal;
        this.size = size;
        this.speed = speed;

        //starting position
        let a = angleCalc(canal.redBankStartX, canal.redBankStartY, canal.redBankEndX, canal.redBankEndY);
        let opp = Math.sin(a) * this.canal.width;
        let adj = Math.cos(a) * this.canal.width;

        this.x = canal.redBankStartX + (opp/2);
        this.y = canal.redBankStartY + (adj/2);

    }

    move(){
        let setting = this.canal;
        //set limit next to black line
        let upperLimit = (setting.redBankGrad * this.x) + setting.redBankOffset;
        let lowerLimit = (setting.blackBankGrad * this.x) + setting.blackBankOffset;
        console.log("tes " + setting.blackBankGrad);


        let s = this.speed;
        fill("purple");
        circle(this.x, this.y, this.size);
        circle(this.canal.end[0], this.canal.end[1], 5);
        text(setting.redBankGrad, 50, 50);
        if(keyIsPressed){
            if(key === 'w' && this.y > upperLimit){
                this.y -= s;
            }
            if(key === 's' && this.y < lowerLimit){
                this.y += s;
            }
            if(key === 'd'){
                this.x += s;
            }
            if(key === 'a'){
                this.x -= s;
            }
        }
        
        if(this.x > setting.redBankEndX || this.y > setting.redBankEndY){
            let pasturesNew = this.canal.connection;
            this.canal = pasturesNew;
  
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
    const numer = y2-y1;
    const denom = x2-x1;
    const outp = numer/denom;
    return outp;
}

//front of house


let c1; 
let c2;
c1 = new canal(60, "blue", 200, 200, 300, 300, c2);
c2 = new canal(60, "blue", 300, 300, 330, 500, c1);
let b = new boat(c1, 20, 2);

function setup(){
    createCanvas(700, 700);

  

}

function draw(){
    background("green");

    c1.visualize();


    c2.visualize();
    b.move();
   

}