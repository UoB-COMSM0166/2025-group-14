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
        let c1 = new canal(1000, 3, 150, player, false, false); //TODO would be nice to have the start also blocked (like reverse of finish)
        let c2 = new canal(500, 2, 150, player, false);
        let c3 = new canal(1000, 3, 150, player, false);
        let c4 = new canal(500, 2.5, 150, player, true)
        let c5 = new canal(500, 3.5, 150, player, true, true)

        let network = new canalNetwork(0, 0, [c1, c2, c3, c4 , c5]); 
        return new canalMap(player, false, network); 
    }
    
    static getMap1(player) {
        let c1 = new canal(300, 2, 100, player); //right, up
        let c2 = new canal(770, 4.5, 150, player); //right, down
        let c3 = new lock(470, 7, 130, player); //left, down
        let c4 = new canal(600, 10, 220, player); //left up
        let c5 = new canal(400, 9, 60, player);

        let network = new canalNetwork(50, -350, [c1, c2, c3, c4 , c5]); 
        return new canalMap(player, true, network); 
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
                                                        c11, c12]);
        return new canalMap(player, true, network);
    }
}