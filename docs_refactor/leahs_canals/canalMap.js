// Changelog for Leah: 
// 1) Line 5: Added the optional customNetwork parameter to the constructor to allow for different networks to be passed in.
// 2) Lines 11 - 21: Added if/else: if no custom network is provided then create the default one, else use the custom one provided
class canalMap {
    constructor(player, garbageOn = true, customNetwork = null){
        this.networks = [];
        this.player = player;
        this.garbageOn = garbageOn;
        //FOR NOW - make any changes to the testmap below

        if (customNetwork == null) {
            let c1 = new canal(300, 2, 100, this.player, garbageOn); //right, up
            let c2 = new canal(770, 4.5, 150, this.player, garbageOn); //right, down
            let c3 = new lock(470, 7, 130, this.player, garbageOn, 5, 3); //left, down
            let c4 = new canal(600, 10, 220, this.player, garbageOn); //left up
            let c5 = new canal(400, 9, 60, this.player, garbageOn);
            this.networks.push(new canalNetwork(50, -350, [c1, c2, c3, c4 , c5], []));  
        } else {
            for(const network of customNetwork){
                this.networks.push(network);
            }
        }

        print("Canal network x and y:" + this.networks[0].x + ", " + this.networks[0].y);
       
        this.linkages = []
        if(this.networks.length > 1){
            this.setLinkages();
        }

        this.bankSprites = null
        this.setBankSprites();

    }

    setLinkages(){
        this.forAllNetworks(network => {
            let linkages = network.getLinkages();
            for(const link of linkages){ 
                let outbound = link[0];
                let inbound = link[1];
                let origin = network;
                let destination = this.getNetworkByCanal(inbound);
                this.linkages.push(new linkage(origin, destination, outbound, inbound, this));

            }

        })
        for(const linkOne of this.linkages){
            for(const linkTwo of this.linkages){
                if(linkOne.checkInverse(linkTwo)){
                    let crosshairs = this.linkages.indexOf(linkTwo);
                    this.linkages.splice(crosshairs, 1)

                }
            }
        }
        for(const link of this.linkages){
            link.positionLink();
        }
    }

    clearRoute(start, end){
        let networkCanals = []
        this.forAllNetworks(network => network.forAllCanals(canal => networkCanals.push(canal)));
        for(const c of networkCanals){
            let redCoords = [c.getCoord("redStart"), c.getCoord("redEnd")];
            let blackCoords = [c.getCoord("blackStart"), c.getCoord("blackEnd")];
            let crossable = true;
            if(checkCrossBetweenBounds([start, end], redCoords, true)){
                crossable = false;
            }
            if(checkCrossBetweenBounds([start, end], blackCoords, true)){
                crossable = false;
            }
            if(crossable){
                return true;
            }
        }
        return false;
    }

    connectNetworks(origin, destination, outCanal, inCanal){
        let exit = outCanal.checkExits();
        let entrance = inCanal.checkExits();
        //BOOKMARK, as this has gotten complicated! Let's make sure we're visualizing this right 
        //before we continue        
    }

    getNetworkByCanal(c){
        let found = false;
        let i = 0;
        let network;
        while(!found){
            network = this.networks[i];
            found = network.checkForCanal(c);
            i++;
        }
        return network;
    }

    getBankSprites(){return this.bankSprites};

    setBankSprites(){
        this.bankSprites = [];
        let tmp = []
        this.forAllNetworks(network => tmp.push(network.getBankSprites()));
        this.forAllLinkages(linkage => tmp.push(linkage.getBankSprites()));
        for(const entry of tmp){
            for(const subentry of entry){
                this.bankSprites.push(subentry);
            }
        }
    }

    forAllLinkages(callback){
        for(const linkage of this.linkages){
            callback(linkage);
        }
    }


    forAllNetworks(callback){
        for(const network of this.networks){
            callback(network);
        }
    }
    
    animate(){
        this.forAllNetworks(network => network.animate());
        this.forAllLinkages(linkage => linkage.animate());
    }

    removeSprites(){
        this.forAllNetworks(network => network.remove());
        this.forAllLinkages(linkage => linkage.remove());
    }

}