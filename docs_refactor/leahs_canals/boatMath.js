function coordinateArgs(first, second, callback){
    callback(first[0], first[1], second[0], second[1])

}

 function gradient(start, end){
    let x1 = start[0];
    let y1 = start[1];
    let x2 = end[0];
    let y2 = end[1]

    const numer = y2-y1;
    const denom = x2-x1;
    const outp = numer/denom;
    return outp;
}


function offset(gradient, coords){
    let X = coords[0];
    let Y = coords[1];
    return -1 * ((gradient * X) - Y);
}

function angleCalc(startX, startY, endX, endY, rads, atan2, abs){
    let pi = Math.PI;
    let opp = endY - startY;
    let adj = startX - endX
    let tanoutp = opp/adj;
    let outp;
    if(atan2){
        outp = (Math.atan2(opp, adj) + pi/2);
    }else{
        outp = Math.atan(tanoutp);
    }
    if(rads){
        if(abs){
            return ((outp - (2 * pi)) % pi) * -1;
        }else{
            return outp;
        }
    }else{
        outp = this.radsToDegrees(outp);
        if(abs){
            return ((outp - 360) % 360) * -1;
        }
        return outp;
    }
} 


function linearIntersect(a1, c1, a2, c2){
    let x = ((-1*c2) + c1)/((-1*a1) + a2);
    let y = ((c1*a2) - (c2*a1))/((-1*a1)+a2);
    return [x, y];
}

function halfwayPoint(start, end){
    let xStart = start[0];
    let yStart = start[1];

    let xChange = end[0] - start[0];
    let yChange = end[1] - start[1];

    xChange /= 2;
    yChange /= 2;

    xStart += xChange;
    yStart += yChange;

    return [xStart, yStart];

}

function pointOnLine(start, end, distance){
    let xStart = start[0];
    let yStart = start[1];
    let xEnd = end[0];
    let yEnd = end[1];

    let angle = this.angleCalc(xStart, yStart, xEnd, yEnd, true, true, false);


    let adj = Math.cos(angle) * distance;
    let opp = Math.sin(angle) * distance;

    return [xStart - opp, yStart - adj];        

}

function clockToAngle(oClock){
    return oClock * Math.PI / 6;
}

function radsToDegrees(rads){
    return rads * (180/Math.PI);
}

function getHypotenuse(start, end){
    return Math.sqrt(Math.pow(start, 2), Math.pow(end, 2));
}
