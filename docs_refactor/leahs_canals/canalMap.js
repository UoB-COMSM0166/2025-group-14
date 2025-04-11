class canalMap {
    constructor(player, garbageOn = true){
        this.networks = [];
        this.player = player;
        this.garbageOn = garbageOn;
        //FOR NOW - make any changes to the testmap below
        let c1 = new canal(300, 2, 100, this.player, garbageOn); //right, up
        let c2 = new canal(770, 4.5, 150, this.player, garbageOn); //right, down
        let c3 = new lock(470, 7, 130, this.player); //left, down
        let c4 = new canal(600, 10, 220, this.player); //left up
        let c5 = new canal(400, 9, 60, this.player);
        this.networks.push(new canalNetwork(50, -350, [c1, c2, c3, c4 , c5]))
        print("Canal network x and y:" + this.networks[0].x + ", " + this.networks[0].y);

        this.bankSprites = null
        this.setBankSprites()
    }

    getBankSprites(){return this.bankSprites()};

    setBankSprites(){
        this.bankSprites = [];
        let tmp = []
        this.forAllNetworks(network => tmp.push(network.getBankSprites()));
        for(const entry of tmp){
            for(const subentry of entry){
                this.bankSprites.push(subentry);
            }
        }

        console.log("outer: " + this.bankSprites.length);
    }

    forAllNetworks(callback){
        for(const network of this.networks){
            callback(network);
        }
    }
    
    animate(){
        this.forAllNetworks(network => network.animate());
    }

    removeSprites(){
        this.forAllNetworks(network => network.remove());
    }

}