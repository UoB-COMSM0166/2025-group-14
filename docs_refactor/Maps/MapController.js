class MapController {   

    static getMap(mapNumber, player) {
        switch(mapNumber) {
            case 0:
                return MapController.getMap0(player);
            case 1:
                return MapController.getMap1(player);
            case 2:
                return MapController.getMap2(player);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    static getMap0(player) {
        let c1 = new canal(1000, 3, 150, player); //TODO update this with new canal structure
        let c2 = new canal(500, 2, 150, player);
        let c3 = new canal(1000, 3, 150, player);
        let c4 = new canal(500, 2.5, 150, player);
        let c5 = new canal(500, 3.5, 150, player);
        let c6 = new lock(500, 2, 150, player);
        let c7 = new canal(500, 12.5, 150, player);
        let c8 = new canal(500, 11, 150, player, true, true);

        let network = new canalNetwork(0, 0, [c1, c2, c3, c4 , c5, c6, c7, c8], []); 
        return new canalMap(player, true, [network]); 
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
}