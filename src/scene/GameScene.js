import Player from '../sprite/Player.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('building-bg', 'assets/building_background.png');
        this.load.spritesheet('player', 'assets/player_strip10.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('playerjump', 'assets/player_jump_strip2.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.image('metal-platform', 'assets/metal_platform.png');
    }
    
    create() {
        this.scrollingBg = this.add.tileSprite(600,300,400,1000,'building-bg');

        this.staticBg = this.add.image(100,100,'building-bg');

        // TODO : Remove
        this.sol = this.physics.add.staticGroup();
        this.sol.create(600, 600, 'metal-platform').setScale(2).refreshBody();
    
        this.player = new Player({
            scene: this,
            key: 'player',
            x: 550,
            y: 300
        });
        this.add.existing(this.player);

        this.cameras.main.setBackgroundColor("rgb(120, 120, 255)");

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        this.physics.add.collider(this.player, this.sol);

        console.log(this);
    }

    update() {
        this.player.update(this);
    }
}