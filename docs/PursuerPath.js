class PursuerPath {
  
  static getStartCorner(canal) {
   let x = canal.redBank.beforeIntersectX; 
   let y = canal.redBank.beforeIntersectY;
   return {x, y};
  }

  static getEndCorner(canal) {
    let x = canal.redBank.afterIntersectX; 
    let y = canal.redBank.afterIntersectY;
    return {x, y};
  }

  //This finds a point slightly away from the canal corners to target
  static getPath(canal, direction) {
    let key = direction === "reverse" ? "beforeIntersect" : "afterIntersect";

    let xRed = canal.redBank[key + "X"];
    let yRed = canal.redBank[key + "Y"];
    let xBlack = canal.blackBank[key + "X"];
    let yBlack = canal.blackBank[key + "Y"];

    let d = 0.3; // d is % of total space between red/black corners
    
    let x = xRed + d * (xBlack - xRed);
    let y = yRed + d * (yBlack - yRed)
    
    return {x, y};
  }

  static calcDist(from, to) {
    return dist(from.x, from.y, to.x, to.y);
  }
}
