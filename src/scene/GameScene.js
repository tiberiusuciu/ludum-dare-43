import Player from '../sprite/Player.js';

const LEVEL_HEIGHT = 30000;
const MIN_SPACE = 140;
const MAX_SPACE = 180;

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
        this.scrollingBg = this.add.tileSprite(600, LEVEL_HEIGHT / 2, 600, LEVEL_HEIGHT, 'building-bg');

        this.platforms = this.physics.add.staticGroup();
        this.floor = this.platforms.create(600, LEVEL_HEIGHT - MIN_SPACE, 'metal-platform').setScale(6, 4).refreshBody();
        var example = new Phaser.GameObjects.Sprite(this, 0, 0, 'metal-platform');

        var leftPlatform = true;
        for(var y = LEVEL_HEIGHT - MIN_SPACE * 2 ; y > (MAX_SPACE + MIN_SPACE) / 2 ; y -= (Math.random() * (MAX_SPACE - MIN_SPACE)) + MIN_SPACE) {
            var limit = 450;
            var x = (Math.random() * ((325 + example.width / 1.8) - limit)) + limit;
            if(leftPlatform) {
                limit = 400;
                origin = 0;
                (Math.random() * ((875 - example.width / 1.8) - limit)) + limit
            }
            var x = (Math.random() * 350) + limit;
            leftPlatform = !leftPlatform;
            this.platforms.create(x, y, 'metal-platform').setScale(4, 2).refreshBody();
        }
    
        this.player = new Player({
            scene: this,
            x: 550,
            y: LEVEL_HEIGHT - MAX_SPACE * 1.2
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

        this.physics.add.collider(this.player, this.platforms);

        console.log(this);
    }

    update() {
        this.player.update(this);
    }
}