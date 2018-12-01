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
    }
    
    create() {
        this.add.image(400, 300, 'building-bg');
        
        this.player = new Player({
            scene: this,
            key: 'player',
            x: 350,
            y: 550
        });

        this.add.existing(this.player);
        //this.cameras.main.startFollow(this.player);
        this.cameras.main.setBackgroundColor("rgb(120, 120, 255)");

        this.cursors = this.input.keyboard.createCursorKeys();

        console.log(this);
    }

    update() {
        this.player.update(this);
    }
}