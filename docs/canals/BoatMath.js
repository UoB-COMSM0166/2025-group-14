//gradient of a line between two points
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

//offset of a line between two points
function offset(gradient, coords){
    let X = coords[0];
    let Y = coords[1];
    if(gradient === Infinity || gradient === -Infinity){
        return X;
    }
    return -1 * ((gradient * X) - Y);
}

//calculates the angle of a line between two points, optionally in radians, using atan2, and/or treating midnight as 0 degrees
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

function degreesToRadians(d) { return d * Math.PI / 180; }

//calcultes the intersection of two lines with gradient a and offset c
function linearIntersect(a1, c1, a2, c2){
    let x, y;
    if(a1 === Infinity || a1 === -Infinity){
        x = c1;
        y = a2 * x + c2;
    }else if(a2 === Infinity || a2 === -Infinity){
        x = c2;
        y = a1 * x + c1;
    }else{
        x = ((-1*c2) + c1)/((-1*a1) + a2);
        y = ((c1*a2) - (c2*a1))/((-1*a1)+a2);
    }
    return [x, y];
}

//finds the coordinates halfway along a line between two coordinates
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

function clockToAngle(oClock){

    return (oClock * Math.PI) / 6;
}

function angleToClock(angle){
    return angle * 6 / Math.PI;
}

function radsToDegrees(rads){
    return rads * (180/Math.PI);
}

function getHypotenuse(start, end){
    let xChange = end[0] - start[0];
    let yChange = end[1] - start[1];
    return Math.sqrt(Math.pow(xChange, 2) + Math.pow(yChange, 2));
}
