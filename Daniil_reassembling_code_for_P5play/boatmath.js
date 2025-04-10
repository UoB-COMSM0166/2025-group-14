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

function offset(gradient, X, Y){
    return -1 * ((gradient * X) - Y);
}

function limitY(x, grad, offset){
    return (grad * x) + offset;
}

function limitX(y, grad, offset){
    return (y - offset) / grad;
}
