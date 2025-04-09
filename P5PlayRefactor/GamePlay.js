class GamePlay {
    constructor() {

    }

    display() {
        // clean the previous frame
        clear();

        // not necessarily sure what camera.on() does exactly, but if I touch it everything breaks
        camera.on();

        network.animate();


        playerCfg.camera();

        // coordinateGrid();

        playerCfg.movement();
        playerCfg.debug();

        pursuerCfg.update();

        mapConstructor();

        coordinateGrid();

        // // like with camera on, if I touch it, everything breaks
        // camera.off();
    }
}