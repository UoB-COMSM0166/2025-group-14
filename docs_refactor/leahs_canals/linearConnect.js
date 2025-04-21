class linearConnect{
    constructor(){
        this.redCoords = null;
        this.blackCoords = null;
        this.bankSprites = null;
    }

    
    animate(){
        this.forAllCanals(canal => canal.animate());
    }
    
    createSprites(){
        this.forAllCanals(canal => canal.createSprites());
    }

    setBankSprites(){
        this.bankSprites = [];
        let tmp = []
        this.forAllCanals(canal => tmp.push(canal.getBanks()));
        for(const entry of tmp){
            for(const subentry of entry){
                this.bankSprites.push(subentry);
            }
        }
    }

    setBlackCoords(loop = false){
        let blackChanges = []
        this.forAllCanals(canal =>
            blackChanges.push(canal.getWidthChanges())
        )

        let widths = []
        this.forAllCanals(canal =>
            widths.push(canal.getWidth())

        )

        let bc = [];
        let rc = this.redCoords;
        
        let first = rc[0];
        let firstBlack = blackChanges[0];
        bc.push([first[0] + firstBlack[0], first[1] + firstBlack[1]]);

        let i;
        let rclength = rc.length - 1;
        for(i = 1; i < rclength; i++){
            let red = rc[i];
            let prev = blackChanges[i - 1];
            let next = blackChanges[i];
            let prevEnd = [red[0] + prev[0], red[1] + prev[1]];
            let nextStart = [red[0] + next[0], red[1] + next[1]];
            let pRed = rc[i - 1];
            let nRed = rc[i + 1];
            let pGrad = gradient(pRed, red);
            let nGrad = gradient(red, nRed);
            if(pGrad === nGrad){
                let pWidth = widths[i - 1];
                let nWidth = widths[i];
                if(pWidth === nWidth){
                    console.log("STraight " + next);
                    let x = red[0] + next[0];
                    let y = red[1] + next[1];    
                    bc.push([x, y])              
                }else{
                    throw new Error("You can't connect two canals of different widths in a straight line")
                }
            }else{
                let prevOff = offset(pGrad, prevEnd);
                let nextOff = offset(nGrad, nextStart);
                let int = linearIntersect(pGrad, prevOff, nGrad, nextOff);
                bc.push(int);
            }
        }

        if(loop){
            bc.push(bc[0])
        }else{
            //note that this this is slightly ugly and leads to some non parallel canals.
            //I could potentially fix it but that's a low priority. 
            

            let lastChange = blackChanges[i - 1];
            bc.push([last[0] + lastChange[0], last[1] + lastChange[1]])
        }
            

        this.blackCoords = bc;
    
    }

}