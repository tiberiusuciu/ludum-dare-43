import Player from '../sprite/Player.js';

const LEVEL_HEIGHT = 30000;
const A = -1 / LEVEL_HEIGHT;
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

        this.sacrifices = [];
        this.generatePlatforms();
    
        this.player = new Player({
            scene: this,
            x: 550,
            y: LEVEL_HEIGHT - MAX_SPACE * 1.2
        });
        this.add.existing(this.player);

        this.cameras.main.setBackgroundColor("rgb(120, 120, 255)");

        this.createKeyboard();

        this.physics.add.collider(this.player, this.platforms);

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xcc2900 } });
        this.lineHeight = LEVEL_HEIGHT;
        this.lineGap = -1;
        this.speedUpEach = 200;
        this.speedCounter = 0;
        this.line = new Phaser.Geom.Line(-1000, this.lineHeight, 2000, this.lineHeight);

        this.lineDistance = this.add.text(1100, 550, '0m', { fontSize: '20px', fill: '#cc2900' });
        this.lineDistance.setScrollFactor(0);

        this.isDying = false;
        this.deathText = this.add.text(600, 300, '', { fontSize: '450px', fill: '#cc2900' }).setAlpha(0.5).setOrigin(0.5);
        this.deathText.setScrollFactor(0);

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.restart();
        }, this);
    }

    update() {
        this.player.update(this);

        ++this.speedCounter;
        if(this.lineGap >= -3 && this.speedCounter >= this.speedUpEach) {
            this.speedCounter = 0;
            this.speedUpEach *= 3;
            --this.lineGap;
        }

        this.lineHeight += this.lineGap;
        this.line.setTo(-1000, this.lineHeight, 2000, this.lineHeight);

        var distanceFromLine = parseInt((this.line.y1 - this.player.y - this.player.height / 2) / 28);
        if(distanceFromLine >= 11) {
            this.lineDistance.setText(distanceFromLine + 'm');
            this.lineDistance.setColor(distanceFromLine < 50 ? '#cc2900' : '#FFF');
        } else {
            this.lineDistance.setText('');
        }

        if(distanceFromLine < 0) {
            if(!this.isDying) {
                this.isDying = true;
                this.timer = this.time.addEvent({ delay: 1000, callback: this.deathTimer, callbackScope: this, repeat: 3});
            }
        } else {
            if(this.timer) {
                this.timer.paused = true;
            }
            this.deathText.setText('');
            this.isDying = false;
        }
        
        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);
    }

    deathTimer() {
        this.deathText.setText(this.timer.getRepeatCount());
        if(this.timer.getRepeatCount() <= 0) {
            this.cameras.main.fadeOut(1000);
        }
    }

    createKeyboard() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
    }

    generatePlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.floor = this.platforms.create(600, LEVEL_HEIGHT - MIN_SPACE, 'metal-platform').setScale(6, 4).refreshBody();

        var leftPlatform = true;
        for(var y = LEVEL_HEIGHT - MIN_SPACE * 2 ; y > (MAX_SPACE + MIN_SPACE) / 2 ; y -= (Math.random() * (MAX_SPACE - MIN_SPACE)) + MIN_SPACE) {
            var scale = (Math.random() * (4 - 1)) + 1;
            var x = (Math.random() * (550 - (380 + (scale * 40)))) + (380 + (scale * 40));
            if(leftPlatform) {
                origin = 0;
                x = (Math.random() * ((820 - (scale * 40)) - 650)) + 650;
            }
            leftPlatform = !leftPlatform;
            var platform = this.platforms.create(x, y, 'metal-platform').setScale(scale, 2).refreshBody();

            this.maybeAddSacrifice(platform);
        }
    }

    maybeAddSacrifice(platform) {
        if(Math.random() < platform.y * A + 1) {
            var min = platform.x - platform.width / 2;
            var max = platform.x + platform.width / 2;
            var ennemy = this.physics.add.sprite((Math.random() * (max - min)) + min, platform.y - MIN_SPACE, 'player').setScale(3);
            this.physics.add.existing(ennemy);
            this.physics.add.collider(ennemy, this.platforms);
        }
    }
}