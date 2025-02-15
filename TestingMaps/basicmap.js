class canal{
    constructor(width, color, startX, startY, endX, endY, before, after){
        this.width = width;
        this.colour = color;
        this.redBankStartX = startX;
        this.redBankStartY = startY;
        this.redBankEndX = endX;
        this.redBankEndY = endY
        this.before = before;
        this.after = after;

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

        this.bank1off = -1 * ((this.bank1grad * startX) - startY);



    }

    visualize(){
 

        stroke("red");//test
        line(this.start[0], this.start[1], this.end[0], this.end[1]);
        fill("red");
        stroke("black");//test
        line(this.start[0] + this.opp, this.start[1] + this.adj, this.end[0] + this.opp, this.end[1] + this.adj);

 
        

 
 
    }

    setConnections(before, after){
        this.before = before;
        this.after = after;
    }

}

class boat{
    constructor(canal, size, speed){
        this.canal = canal;
        this.size = size;
        this.speed = speed;
        this.afterThresholdGrad = null;
        this.afterThresholdOffset = null;
        this.beforeThresholdGrad = null;
        this.beforeThresholdOffset = null;

        //starting position
        let a = angleCalc(canal.redBankStartX, canal.redBankStartY, canal.redBankEndX, canal.redBankEndY);
        let opp = Math.sin(a) * this.canal.width;
        let adj = Math.cos(a) * this.canal.width;

        this.x = canal.redBankStartX + (opp/2);
        this.y = canal.redBankStartY + (adj/2);
        this.setAfterThreshold();

    }

    setAfterThreshold(){
        if(this.canal.after != null){
            let after = this.canal.after;
            let current = this.canal;
            const LIX = linearIntersectX(current.blackBankGrad, current.blackBankOffset, after.blackBankGrad, after.blackBankOffset);
            const LIY = linearIntersectY(current.blackBankGrad, current.blackBankOffset, after.blackBankGrad, after.blackBankOffset);
            console.log("lix " + LIX);
            console.log(LIY);
            this.afterThresholdGrad = gradient(LIX, LIY, current.redBankEndX, current.redBankEndY);
            this.afterThresholdOffset = -1 * ((this.afterThresholdGrad * LIX) - LIY);
            console.log("THG " + this.afterThresholdGrad);
            console.log("THO " + this.afterThresholdOffset)


        }
    }

    setBeforeThreshold(){
        if(this.canal.before != null){
            let before = this.canal.before;
            let current = this.canal;
            const LIX = linearIntersectX(current.blackBankGrad, current.blackBankOffset, before.blackBankGrad, before.blackBankOffset);
            const LIY = linearIntersectY(current.blackBankGrad, current.blackBankOffset, before.blackBankGrad, before.blackBankOffset);

            this.beforeThresholdGrad = gradient(LIX, LIY, current.redBankStartX, current.redBankStartY);
            this.beforeThresholdOffset = -1 * ((this.beforeThresholdGrad * LIX) - LIY);



        }

    }

    

    move(){
        let setting = this.canal;
        //set limit next to black line
        let upperLimit = (setting.redBankGrad * this.x) + setting.redBankOffset;
        let lowerLimit = (setting.blackBankGrad * this.x) + setting.blackBankOffset;
        let rightLimit = ((this.y - setting.redBankOffset) / setting.redBankGrad);
        let leftLimit = ((this.y - setting.blackBankOffset) / setting.blackBankGrad);
        console.log("tes " + setting.blackBankGrad);
        let afterBorderHor = 700
        let afterBorderVer = 700
        let beforeBorderHor = 0;
        let beforeBorderVer = 0;
        
        if(setting.after != null){
       
            afterBorderHor = (this.y - this.afterThresholdOffset)/this.afterThresholdGrad;
            afterBorderVer = (this.x * this.afterThresholdGrad) + this.afterThresholdOffset;
        }
        if(setting.before != null){
       
            beforeBorderHor = (this.y - this.beforeThresholdOffset)/this.beforeThresholdGrad;
            beforeBorderVer = (this.x * this.beforeThresholdGrad) + this.beforeThresholdOffset;
        }


        let s = this.speed;
        fill("purple");
        circle(this.x, this.y, this.size);
        if(keyIsPressed){
            if(key === 'w' && this.y > upperLimit){
                this.y -= s;
            }
            if(key === 's' && this.y < lowerLimit){
                this.y += s;
            }
            if(key === 'd' && this.x < rightLimit){
                this.x += s;
            }
            if(key === 'a' && this.x > leftLimit){
                this.x -= s;
            }
        }

        text("x " + this.x, 400, 50);//testprint
        text("y " + this.y, 400, 100);
        text("redVerlimit " + upperLimit, 400, 150)
        text("blackVerlimit " + lowerLimit, 400, 200);
        text("redHorlimit " + rightLimit, 400, 250);
        text("blackHorlimit " + leftLimit, 400, 300);


        
        if(this.y > afterBorderVer && this.x > afterBorderHor){
            console.log("Reached border!");
            let pasturesNew = this.canal.after;
            this.canal = pasturesNew;
            if(this.canal.after != null){
                this.setAfterThreshold();
            }
            this.setBeforeThreshold();

  
        }

        if(this.y < beforeBorderVer && this.x < beforeBorderHor){
            console.log("Reached former border!");
            let pasturesNew = this.canal.before;
            this.canal = pasturesNew;
            if(this.canal.before != null){
                  this.setBeforeThreshold();
            }
            this.setAfterThreshold();

  
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

function linearIntersectX(a1, c1, a2, c2){
    return ((-1*c2) + c1)/((-1*a1) + a2);


}

function linearIntersectY(a1, c1, a2, c2){
    return ((c1*a2) - (c2*a1))/((-1*a1)+a2);
}

//front of house

//c2 = 300, 300, 330, 500
//c1 = 200, 200, 300, 300

let c2 = new canal(60, "blue", 300, 300, 330, 500, null, null);
let c1 = new canal(60, "blue", 200, 200, 300, 300, null, null);
c1.setConnections(null, c2);
c2.setConnections(c1, null);
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