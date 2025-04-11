class LevelController {
    // controls which level to load into main for display
    // this assumes that the level will have a setup() method
    static getLevel(level) {
        let levelInstance = null;
        switch (level) {
            case 0:
                levelInstance = new Level0();
                break;
            case 1:
                levelInstance = new Level1();
                break;
            case 2:
                throw new Error("Invalid level number: " + level);
        }
        levelInstance.setup();
        return levelInstance;
    }

    
}