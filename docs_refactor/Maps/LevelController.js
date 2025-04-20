class LevelController {
    // assets only loaded once - on first load
    static firstTimeLoading = true;

    // controls which level to load into main for display
    // this assumes that the level will have a setup() method
    static getLevel(level) {
        LevelController.loadAssets();
        let levelInstance = null;
        switch (level) {
            case 0:
                levelInstance = new TutorialSetupDisplay();
                break;
            case 1:
            case 2:
            case 3:
                levelInstance = new AllMapsSetupDisplay();
                break;
            case 4:
                throw new Error("Invalid level number: " + level);
        }
        levelInstance.setup();
        return levelInstance;
    }

    // Quick and dirty fix to load assets in only once - p5Play *really* doesn't like it when you try to add an animation to
    // the same sprite twice (crashes). Think there is probably a much more elegant way to do this with preload but haven't figured it out yet.
    static loadAssets() {
        if (LevelController.firstTimeLoading) {
            LevelController.playerAnimation = loadAnimation("Boat-redbrown.png", [
                [64, 64, 64, 32],
                [0, 0, 64, 32],
                [0, 64, 64, 32],
              ]);
              LevelController.pursuerAnimation = loadAnimation("Boat-grey.png", [
                [64, 64, 64, 32],
                [0, 0, 64, 32],
                [0, 64, 64, 32],
            ]);
            LevelController.firstTimeLoading = false;
        }
    }
}