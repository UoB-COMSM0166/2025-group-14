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
                return MapController.getMap3(player);
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    // initialises a player sprite at desired location
    static getPlayer(mapNumber) {
        switch(mapNumber) {
            case 0:
                return new Sprite(100, 70, 35, 25);
            case 1:
                return new Sprite(100, 100, 35, 25);
            case 2:
                return new Sprite(265, -328, 35, 25);
            case 3:
                return new Sprite(1774, 468, 35, 25);//originallyl 186, 52, 35, 25
            default:
                throw new Error("Invalid map number: " + mapNumber);
        }
    }

    // initialises a pursuer sprite at desired location
    static getPursuer(mapNumber) {
        switch(mapNumber) {
            case 0:
                return new Sprite(100, 70, 25, 15);
            case 1:
                return new Sprite(40, 100, 25, 15);
            case 2:
                return new Sprite(-442, -327, 25, 15);
            case 3:
                return new Sprite(37, 39, 25, 15);
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
        let c6 = new lock(500, 2, 150, player, 5, 3);
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

    static getMap3(player){
        let stdwidth = 100;

        let intro = new canal(200, 3, 100, player);
        let firstGates = new canal(200, 4, stdwidth, player);
        let after = new canal(200, 7, stdwidth, player);

        let inLoop = [];
        for (let i = 1; i < 12; i++){
            inLoop.push(new canal(200, i, 100, player));
        }

        let outLoop = [];
        for (let i = 2; i <= 9; i++){
            outLoop.push(new canal(400, i, 100, player));
        }


        let tangent = new canal(100, 9, stdwidth, player);
        let mazeIn = []
        let Out = []

        let start = 10;
        let mazeInLen = 500
        let add = [0, 0, 0, 0, 0, 100, 50, 100, 150, 50, 50, 50]
        for (let i = 0; i < 12; i++){
                mazeIn.push(new canal(mazeInLen + add[i], ((start + i) % 12), 100, player));
            
        }

        let topMidArc = []
        let rightMidArc = []
        let mazeMidLen = 650
        let topStart = 10
        let rightStart = 12
        add = [0, 450, 100]
        let index = 0;
        for (let i = 0; i > -3; i--){
            topMidArc.push(new canal(mazeMidLen, ((topStart + i) % 12), 100, player));
            rightMidArc.push(new canal(mazeMidLen + add[index++], ((rightStart + i) % 12), 100, player));
        
        }

             


        /*let harsh = 60;
        let downZig = [100, 11, harsh, player];
        let upZig = [100, 7, harsh, player];

        let shortZigs = [[], [], [], [], []];
        for(let duo of shortZigs){
            duo[0] = new canal(downZig);
            duo[1] = new canal(upZig);
        }

        //let straight = new lockSegment(400, 9, stdwidth, player, 3, 2, 0.5);
        let straight = new lock(400, 9, stdwidth, player, 3, 2);
        let up = new canal(400, 12, stdwidth, player)

        harsh = stdwidth;
        let dec = 10
        let zigLen = 300;
        let right = 2;
        let left = 10;

        let longZigs = [[], [], [], [], []];
        for(let trio of longZigs){
            trio[0] = new canal(zigLen, right, harsh, player);
            harsh -= 5;
            trio[1] = new canal(zigLen, left, harsh, player);
            harsh -= 5;
        }

        let fatLocks = []
        let fatwidth = 300
        let fatlength = 500
        let upAfter = new canal(fatwidth*1.5, 12, stdwidth, player)
       /* for(let i = 0; i < 5; i++){
            fatLocks.push(new canal(fatlength, 3, fatwidth, player))
            fatLocks.push(new lock(fatlength, 3, fatwidth, player, 2, 5)) //2, 5, 1 when it was a lockSegment
        }

        let homeStretch = new canal(1000, 5, stdwidth - 20, player);*/
        //let end = new canal(300, 3, stdwidth, player, false, true)


        let lS = 5;
        let o = 1
        let c = 3
        let inc = 0.1

        let threshold = new canalNetwork(0, 0, [intro, firstGates, after], [[after, inLoop[0]]], false);
        let loop = new canalNetwork(300, 300, [inLoop], [[inLoop[1], outLoop[0], o, c += inc, lS],
            [inLoop[2], outLoop[1], o, c += inc, lS],
            [inLoop[3], outLoop[2], o, c += inc, lS],
            [inLoop[4], outLoop[3], o, c += inc, lS],
            [inLoop[5], outLoop[4], o, c += inc, lS],
            [inLoop[6], outLoop[5], o, c += inc, lS],
            [inLoop[7], outLoop[6], o, c += inc, lS],
            [inLoop[8], outLoop[7], o, c += inc, lS],
            ], true);
        /*let arc = new canalNetwork(200, -150, [outLoop, tangent, shortZigs, straight, up,
             longZigs, upAfter, end], [], false);*/
        let arc = new canalNetwork(200, -150, [outLoop, tangent, mazeIn], [[mazeIn[4], topMidArc[2]], [mazeIn[8], rightMidArc[0]]], false);
        let midLayerOne = new canalNetwork(1627, -646, [topMidArc], [])
        let midLayerTwo = new canalNetwork(2395, 720, [rightMidArc], []);

        return new canalMap(player, true, [threshold, loop, arc, midLayerOne, midLayerTwo]);
    }
}