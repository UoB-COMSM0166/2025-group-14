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
                return new Sprite(186, 52, 35, 25);//originallyl 186, 52, 35, 25
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

        let network = new CanalNetwork(0, 0, [c1, c2, c3, c4 , c5, c6, c7, c8], []); 
        return new CanalMap(player, true, [network]); 
    }
    
    static getMap1(player) {
        let c1 = new canal(300, 2, stdwidth, player); //right, up
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

        let n1 = new CanalNetwork(50, -350, [c1, c2, c3, c4 , c5], [[c4, c6], [c2, c8]]); 

        //leah adding a new network to check multinetwork capability

        let n2 = new CanalNetwork(-500, 250, [c6, c7], []) //originally -500, 250
        let n3 = new CanalNetwork(700, -400, [c8, c9, c10, c11], [])

        return new CanalMap(player, true, [n1, n2, n3]); 
       
    }

    static getMap2(player) {
        let c1 = new canal(1000, 3, 200, player); 
        let c2 = new canal(300, 7, stdwidth, player);
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

        let network = new CanalNetwork(-500, -350, [c1, c2, c3, c4, c5, 
                                                        c6, c7, c8, c9, c10,
                                                        c11, c12], []);
        return new CanalMap(player, true, [network]);
    }

    static getMap3(player){
        let stdwidth = 100;

        let intro = new canal(200, 3, stdwidth, player);
        let firstGates = new canal(200, 4, stdwidth, player);
        let after = new canal(200, 7, stdwidth, player);

        let inLoop = [];
        for (let i = 1; i < 12; i++){
            inLoop.push(new canal(200, i, stdwidth, player));
        }

        let outLoop = [];
        for (let i = 2; i <= 9; i++){
            outLoop.push(new canal(400, i, stdwidth, player));
        }


        let tangent = new canal(100, 9, stdwidth, player);
        let mazeIn = []
        let Out = []

        let start = 10;
        let mazeInLen = 500
        let add = [0, 0, 0, 0, 0, 100, 50, 100, 150, 50, 50, 217]
        for (let i = 0; i < 12; i++){
                mazeIn.push(new canal(mazeInLen + add[i], ((start + i) % 12), stdwidth, player));
            
        }

        let topMidArc = []
        let rightMidArc = []
        let lowMidArc = []
        let mazeMidLen = 650
        let topStart = 10
        let rightStart = 12
        let lowStart = 7
        let rightAdd = [0, 450, 100, 250, 200]
        let lowAdd = [100, 0, 250, 300, 150]
        for (let i = 0; i < 5; i++){
            topMidArc.push(new canal(mazeMidLen, ((topStart - i) % 12), stdwidth, player));
            rightMidArc.push(new canal(mazeMidLen + rightAdd[i], ((rightStart - i) % 12), stdwidth, player));
            lowMidArc.push(new canal(mazeMidLen + lowAdd[i], ((lowStart + i) % 12), stdwidth, player));
        }

        let lowTangent = new canal(mazeMidLen + 100, 12, stdwidth, player);

        let finishLine = new canal(300, 9, stdwidth, player, true, true)

        let o = 1
        let c = 3
        let inc = 0.1

        let threshold = new CanalNetwork(0, 0, [intro, firstGates, after], [[after, inLoop[0]]], false);
        let loop = new CanalNetwork(300, 300, [inLoop], [[inLoop[1], outLoop[0], o, c += inc],
            [inLoop[2], outLoop[1], o, c += inc],
            [inLoop[3], outLoop[2], o, c += inc],
            [inLoop[4], outLoop[3], o, c += inc],
            [inLoop[5], outLoop[4], o, c += inc],
            [inLoop[6], outLoop[5], o, c += inc],
            [inLoop[7], outLoop[6], o, c += inc],
            [inLoop[8], outLoop[7], o, c += inc],
            ], true);
        /*let arc = new CanalNetwork(200, -150, [outLoop, tangent, shortZigs, straight, up,
             longZigs, upAfter, end], [], false);*/
        let arc = new CanalNetwork(200, -150, [outLoop, tangent, mazeIn], [[mazeIn[4], topMidArc[2]], [mazeIn[8], rightMidArc[0]]], false);
        let midLayerOne = new CanalNetwork(1627, -646, [topMidArc], [[topMidArc[0], rightMidArc[2], 10, 1], [topMidArc[4], lowTangent, 10, 1]])
        let midLayerTwo = new CanalNetwork(2395, 720, [rightMidArc]);
        let midLayerThree = new CanalNetwork(2100, 810, [lowMidArc, lowTangent, finishLine], [[lowMidArc[2], mazeIn[11]]]);

        return new CanalMap(player, true, [threshold, loop, arc, midLayerOne, midLayerTwo, midLayerThree]);
    }
}