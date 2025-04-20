class MapController {   

    static getMap(mapNumber, player) {
        switch(mapNumber) {
            case 0:
                return MapController.getMap0(player);
            case 1:
                return MapController.getMap1(player);
            case 2:
                return MapController.getMap2(player);
            case 3:
                return MapController.getMapPolly(player);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    static getMap0(player) {
        let c1 = new canal(400, 9, 150, player, false); //right, up

        let network = new canalNetwork(0, 0, [c1/* , c2, c3, c4 , c5 */], []); 
        return new canalMap(player, false, [network]); 
    }
    
    static getMap1(player) {
        let c1 = new canal(300, 2, 100, player); //right, up
        let c2 = new canal(770, 4.5, 150, player); //right, down
        let c3 = new lock(470, 7, 130, player, 5, 3); //left, down (lock, 5, 3)
        let c4 = new canal(600, 10, 220, player); //left up
        let c5 = new canal(400, 9, 60, player); 

        let c6 = new canal(600, 4, 60, player); //originally 600, 4
        let c7 = new canal(500, 5, 60, player); //originally 500, 5

        let c8 = new canal(600, 4, 60, player); //originally 600, 4
        let c9 = new canal(500, 3, 60, player); //originally 500, 3
        let c10 = new canal(300, 5, 80, player);
        let c11 = new canal(800, 7, 80, player);

        let n1 = new canalNetwork(50, -350, [c1, c2, c3, c4 , c5], [[c4, c6], [c2, c8]]); 

        //leah adding a new network to check multinetwork capability

        let n2 = new canalNetwork(-500, 250, [c6, c7], []) //originally -500, 250
        let n3 = new canalNetwork(700, -400, [c8, c9, c10, c11], [])

        return new canalMap(player, true, [n1, n2, n3]); 
    }

    static getMap2(player) {
        let c1 = new canal(1000, 3, 200, player); 
        let c2 = new canal(300, 7, 100, player);
        let c3 = new canal(500, 4, 200, player);
        let c4 = new canal(400, 2, 200, player);
        let c5 = new canal(400, 11, 200, player);
        let c6 = new canal(1200, 3, 150, player);
        let c7 = new canal(700, 7, 150, player);
        let c8 = new canal(500, 3, 150, player);
        let c9 = new canal(700, 7, 150, player);
        let c10 = new canal(500, 10, 150, player);
        let c11 = new canal(600, 7, 150, player);
        let c12 = new canal(600, 9, 150, player, true, true); // means garbage = true and last canal segemnt = true

        let network = new canalNetwork(-500, -350, [c1, c2, c3, c4, c5, 
                                                        c6, c7, c8, c9, c10,
                                                        c11, c12], []);
        return new canalMap(player, true, [network]);
    }

    static getMapPolly(player) {
        let c1 = new canal(200, 3, 100, player); 
        let c2 = new canal(300, 5, 100, player);
        let c3 = new canal(400, 8, 100, player);
        let c4 = new canal(500, 10, 100, player);
        let c5 = new canal(600, 1, 100, player);
        let c6 = new canal(400, 3, 100, player);
        let c6pt5 = new canal(300, 4, 100, player);
        let c7 = new canal(700, 6, 100, player);
        let c8 = new canal(600, 8, 100, player);
        let c9 = new canal(800, 10, 100, player);
        let c10 = new lock(300, 11, 100, player, 5, 3);
        let c11 = new canal(900, 1, 100, player);
        let c12 = new canal(1000, 3, 100, player);
        let c13 = new lock(300, 4, 100, player, 5, 3);
        let c14 = new canal(500, 6, 100, player);
        let c15 = new canal(100, 7, 100, player, true, true);

        //let c15 = new canal(300, 7, 100, player);
        //let c16 = new canal(200, 3, 100, player);
        //let c17 = new canal(200, 12, 100, player);
        //let c18 = new canal(200, 10, 100, player);
       
        let mainNetwork = new canalNetwork(0, 0, [c1, c2, c3, c4, c5, c6, c6pt5, c7, c8, c9, c10, c11, c12, c13, c14, c15], []);
        return new canalMap(player, true, [mainNetwork]);
    }
}