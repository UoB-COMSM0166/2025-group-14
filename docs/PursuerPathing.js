class PursuerPathing {
  
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
}
