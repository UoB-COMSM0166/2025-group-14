class straightCanal{
    constructor(startX, startY, endX, endY, width){
        this.setRedBank(startX, startY, endX, endY);
        this.setBlackBank(startX, startY, endX, endY, width);

    }

    setRedBank(startX, startY, endX, endY){
        this.redBank = this.setBank(startX, startY, endX, endY);
        this.redBank.colour = "red";
    }

    setBlackBank(startX, startY, endX, endY, width){
        //preliminary maths
        let opp = endY - startY;
        let adj = startX - endX;
        let tan = opp/adj;
        let angle = Math.atan(tan);
        let canalOpp = Math.sin(angle) * width;
        let canalAdj = Math.cos(angle) * width;
        this.blackBank = this.setBank(startX + canalOpp, startY + canalAdj, endX + canalOpp, endY + canalAdj);
        this.blackBank.colour = "black";

    }

    setBank(startX, startY, endX, endY){
        let output = new Sprite([[startX, startY], [endX, endY]]);
        output.collider = 'static';
        return output;
    }


}