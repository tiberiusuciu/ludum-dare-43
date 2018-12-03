const LEVEL_HEIGHT = 1000;

export default class FinishScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FinishScene'
        });
    }

    preload() {
        this.load.image('building-bg', 'assets/structure_with_shadow.png');
        this.load.image('city', 'assets/city.png');
    }
    
    create() {
        this.city = this.add.tileSprite(600, 300, 1200, 600, 'city');
        this.scrollingBg = this.add.tileSprite(600, LEVEL_HEIGHT / 2, 600, LEVEL_HEIGHT + 400, 'building-bg');
        this.cameras.main.setBackgroundColor("rgb(77, 195, 255)");
    }

    update() {}
}