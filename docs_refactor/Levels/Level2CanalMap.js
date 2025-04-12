class Level2CanalMap {
  constructor(player, garbageOn = true){
      this.networks = [];
      this.player = player;
      this.garbageOn = garbageOn;
      //FOR NOW - make any changes to the testmap below
      let c1 = new canal(1000, 3, 200, this.player); 
      // let c2 = new canal(300, 7, 100, this.player);
      // let c3 = new canal(500, 4, 200, this.player);
      // let c4 = new canal(400, 2, 200, this.player);
      // let c5 = new canal(400, 11, 200, this.player);
      // let c6 = new canal(1200, 3, 150, this.player);
      // let c7 = new canal(700, 7, 150, this.player);
      // let c8 = new canal(500, 3, 150, this.player);
      // let c9 = new canal(700, 7, 150, this.player);
      // let c10 = new canal(500, 10, 150, this.player);
      // let c11 = new canal(600, 7, 150, this.player);
      // let c12 = new canal(600, 9, 150, this.player, true, true); // means garbage = true and last canal segemnt = true
      let c2 = new canal(1000, 6, 200, this.player, true, true);

      // this.networks.push(new canalNetwork(-500, -350, [c1, c2, c3, c4, c5, 
      //                                                  c6, c7, c8, c9, c10,
      //                                                  c11, c12]));
      this.networks.push(new canalNetwork(-500, -350, [c1, c2]));
      print("Canal network x and y:" + this.networks[0].x + ", " + this.networks[0].y);

      this.bankSprites = null
      this.setBankSprites()
  }

  getBankSprites(){return this.bankSprites};

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