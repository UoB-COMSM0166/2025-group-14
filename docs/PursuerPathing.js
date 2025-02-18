class PursuerPathing {
  
  static getStartCorner(canal) {
   let xCoord = canal.redBank.beforeIntersectX; 
   let yCoord = canal.redBank.beforeIntersectY;
   return {xCoord, yCoord};
  }

  static getEndCorner(canal) {
    let xCoord = canal.redBank.afterIntersectX; 
    let yCoord = canal.redBank.afterIntersectY;
    return {xCoord, yCoord};
  }

  //methods below are pretty redundant
  static incrementCanal(canal) {
    return canal.after;
  }

  static decrementCanal(canal) {
    return canal.before;
  }

  static lineOfSight() {

  }
}
