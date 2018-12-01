import Player from '../sprite/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('building-bg', 'assets/building_background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('metal-platform', 'assets/metal_platform.png');
    }
    
    create() {
        //this.staticBg = this.add.image(600, 300, 'building-bg');
        this.scrollingBg = this.add.tileSprite(600,300,400,1000,'building-bg');

        this.staticBg = this.add.image(100,100,'building-bg');

        // TODO : Remove
        this.sol = this.physics.add.staticGroup();
        this.sol.create(600, 600, 'metal-platform').setScale(2).refreshBody();
    
        this.player = new Player({
            scene: this,
            key: 'player',
            x: 550,
            y: 550
        });

        this.add.existing(this.player);
        //this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor("rgb(120, 120, 255)");

        this.cursors = this.input.keyboard.createCursorKeys();

        let cam = this.cameras.main
        // Set its viewport as same as our game dimension
        cam.setViewport(0,0,1200,600);
        // Center align the camera to occupy all our game objects
        cam.centerToBounds();

        this.physics.add.collider(this.player, this.sol);

        console.log(this);
    }

    update() {
        console.log('update');
        this.scrollingBg.tilePositionY -= 100;
        //this.background1.setTilePosition(this.background1.tilePositionX  - 2);
        this.player.update(this);
    }
}