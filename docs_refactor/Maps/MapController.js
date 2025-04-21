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
        let c1 = new canal(400, 9, 150, player, false); //right, up

        let network = new canalNetwork(0, 0, [c1/* , c2, c3, c4 , c5 */], []); 
        return new canalMap(player, false, [network]); 
    }
    
    static getMap1(player) {
        /*
        Starts with a test of reactions - you need to immediately grab the lock. if so you get quite an advantage.
        But you need it because after that the canal quickly narrows and starts to zigzag. Don't blow your lead!
        You can choose one route that has longer zigzags and one that has shorter. Longer zigzags means it's harder
        to maintain direction and avoid walls, but shorter means that you have to take corners more. 
        Also the longer-zigging route starts wide and gets progressively narrower, while the shorter zig route stays
        narrow, keeping the muscle memory fresh
        The shorter one also slows down the pursuer less
        And you'd better have kept a good lead, because the lock at the end takes a while!
        */

        let longzig = 500;
        let decrement = 10;
        let i = 0;
        let startwidth = 100;

        let c1 = new canal(300, 4, 100, player);
        let l1 = new lock(300, 3, 100, player, 1, 3); //for now - 1, 3
        let c2 = new canal(300, 2, 100, player)
        let c3 = new canal(longzig, 5, startwidth-(decrement * i++), player);
        let c4 = new lock(longzig, 2, startwidth-(decrement * i++), player, 5, 5);
        let c5 = new canal(longzig, 5, startwidth-(decrement * i++), player);
        let c6 = new canal(longzig, 2, startwidth-(decrement * i++), player);
        let c7 = new canal(longzig, 5, startwidth-(decrement * i++), player);
        let c8 = new canal(longzig, 2, startwidth-(decrement * i++), player);
        let c23 = new canal(1000, 10, startwidth, player);
        

        let harsh = 60;
        let shortZig = 100;

        let downZig = [shortZig, 5, harsh, player];
        let elbow = [40, 3, harsh, player];
        let upZig = [shortZig, 1, harsh, player];

        let c9 = new canal(300, 2, 100, player);
        let c10 = new canal(300, 3, 100, player);
        let c11 = new canal(downZig);
        let c12 = new canal(elbow);
        let c13 = new canal(upZig);
        let c14, c15, c16, c17, c18, c19, c20, c21, c22, c24, c25, c26, c27, c28, c29;
        let shortZigs = [[c14, c15, c16], [c17, c18, c19], [c20, c21, c22], [c24, c25, c26], [c27, c28, c29]];
        for(let trio of shortZigs){
            trio[0] = new canal(downZig);
            trio[1] = new canal(elbow);
            trio[2] = new canal(upZig);
        }
        let c30 = new canal(1600, 3, 100, player);

        let loopSeg = 400
        let loopAng = 1;
        let loopWidth = 100;
        let c31, c32, c33, c34, c35, c36, c37, c38, c39, c40, c41;
        /*c31 = new canal(loopSeg, loopAng, loopWidth, player);
        loopAng++;*/
        let loopArc = [c31, c32, c33, c34, c35, c36, c37, c38, c39, c40, c41];
        for(i = 0; i < loopArc.length; i++){
            loopArc[i] = new canal(loopSeg, loopAng, loopWidth, player);
            loopAng++;
        }
        let c42 = new canal(700, 2, loopWidth, player);
        

        let loopWrap = [];
        for(let i = 0; i < 3; i++){
            let ang = 2;
            loopWrap.push(new canal(loopSeg, ang, loopWidth, player))
        }

        




        let long = new canalNetwork(0, 0, [c1, l1, c2, c3, c4, c5, c6, c7, c8, c23], [[c2, c9], [c23, c30]]);
        let short = new canalNetwork(400, -80, [c9, c10, c11, c12, c13, shortZigs, c30, loopArc, c42], [[c42, loopArc[0]]]);
        let wrap = new canalNetwork(3500, -800, [loopWrap], []) //3500, -800

        return new canalMap(player, true, [long, short, wrap]); 

        /* next up - one where the boat is chasing you along a straight line and you pass many open locks and have to dive in?

        */
        
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