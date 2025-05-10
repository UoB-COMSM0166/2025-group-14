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
            case 4:
            case 5:
                levelInstance = new GameController();
                break;
            default:
                throw new Error("Invalid level number: " + level);
        }
        levelInstance.setup();
        return levelInstance;
    }

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