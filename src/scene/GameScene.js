import Player from '../sprite/Player.js';

const LEVEL_HEIGHT = 1000;
const A = (0.05-1) / (LEVEL_HEIGHT+LEVEL_HEIGHT * 0.2);
const BACKGROUND_A = (300 - 1000) / LEVEL_HEIGHT;
const MIN_SPACE = 140;
const MAX_SPACE = 180;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });

        this.waitLinePoint = 0;
        this.arrayOfImages = [
            'metal-platform',
            'metal-platform-2',
            'metal-platform-3',
            'metal-platform-4'
        ];

        this.arrayOfEnnemies = [
            'enemy_01',
            'enemy_02',
            'enemy_03',
            'enemy_04'
        ];
    }

    preload() {
        this.load.image('building-bg', 'assets/structure_with_shadow.png');
        this.load.spritesheet('player', 'assets/player_strip10.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('playerjump', 'assets/player_jump_strip2.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.image('metal-platform', 'assets/metal_platform.png');
        this.load.image('metal-platform-2', 'assets/metal_platform_2.png');
        this.load.image('metal-platform-3', 'assets/metal_platform_3.png');
        this.load.image('metal-platform-4', 'assets/metal_platform_4.png');
        this.load.image('enemy_01', 'assets/enemy_01.png');
        this.load.image('enemy_02', 'assets/enemy_02.png');
        this.load.image('enemy_03', 'assets/enemy_03.png');
        this.load.image('enemy_04', 'assets/enemy_04.png');
        this.load.image('city', 'assets/city.png');

        this.load.audio('bg_music', 'assets/bg_music.wav', {
            instances: 1
        });

        this.load.audio('playerJumpSoundtrue', 'assets/jump.wav', {
            instances: 1
        });
        this.load.audio('playerJumpSoundfalse', 'assets/jump2.wav', {
            instances: 1
        });
    }
    
    create() {
        this.city = this.add.tileSprite(600, 300, 1200, 600, 'city');
        this.city.setScrollFactor(0);
        this.scrollingBg = this.add.tileSprite(600, LEVEL_HEIGHT / 2, 600, LEVEL_HEIGHT + 400, 'building-bg');


        this.ennemies = [];
        this.player = new Player({
            scene: this,
            x: 550,
            y: LEVEL_HEIGHT - MAX_SPACE * 1.2,
            useLerp: true
        });
        this.add.existing(this.player);

        this.sacrifices = [];
        this.generatePlatforms();

        this.cameras.main.setBackgroundColor("rgb(120, 120, 255)");

        this.createKeyboard();

        this.physics.add.collider(this.player, this.platforms);

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xcc2900 } });
        this.lineHeight = LEVEL_HEIGHT;
        this.lineGap = -1;
        this.speedUpEach = 120;
        this.speedCounter = 0;
        this.line = new Phaser.Geom.Line(-1000, this.lineHeight, 2000, this.lineHeight);

        this.lineDistance = this.add.text(1100, 550, '0m', { fontSize: '20px', fill: '#cc2900' });
        this.lineDistance.setScrollFactor(0);

        this.isDying = false;
        this.deathText = this.add.text(600, 300, '', { fontSize: '450px', fill: '#cc2900' }).setAlpha(0.5).setOrigin(0.5);
        this.deathText.setScrollFactor(0);

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.start('Tutorial1Scene');
        }, this);

        if(!this.game.bgmusic) {
            this.sound.play('bg_music', {
                loop: true,
                volume: 0.2
            });
            this.game.bgmusic = true;
        }
    }

    update() {
        this.player.update(this);

        var distanceFromLine = parseInt((this.line.y1 - this.player.y - this.player.height / 2) / 28);;
        if(this.lineHeight > this.maxLine) {
            if(this.waitLinePoint <= 0) {
                this.lineHeight += this.lineGap;
                this.line.setTo(-1000, this.lineHeight, 2000, this.lineHeight);
            } else {
                --this.waitLinePoint;
            }
        } else {
            this.cameras.main.shake(0); 
        }
        
        ++this.speedCounter;
        if(this.lineGap >= -4 && this.speedCounter >= this.speedUpEach) {
            this.speedCounter = 0;
            this.speedUpEach *= 1.8;
            --this.lineGap;
        }

        if(distanceFromLine < 5) {
            this.cameras.main.shake(100, ((distanceFromLine - 10) * -1) * 0.05 / 200);
        } else {
            this.cameras.main.shake(0);
        }

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

        for(var i = 0 ; i < this.ennemies.length ; ++i) {
            var ennemy = this.ennemies[i];
            if(ennemy.active) {
                if(!ennemy.body.point && !ennemy.body.blocked.down) {
                    ennemy.point = true;
                }
                if(ennemy.y > this.lineHeight) {
                    ennemy.setActive(false);
                    if(ennemy.point) {
                        this.waitLinePoint += 25;
                    }
                }
            }
        }
        
        var lineY = BACKGROUND_A * this.player.y + 1000;
        if(lineY < 300) {
            lineY = 300;
        }
        this.city.setY(lineY);
         
        this.graphics.clear();
        this.graphics.strokeLineShape(this.line);
    }

    deathTimer() {
        this.deathText.setText(this.timer.getRepeatCount());
        if(this.timer.getRepeatCount() <= 0) {
            this.cameras.main.fadeOut(350);
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

        var rightPlatform = true;
        var platform;
        for(var y = LEVEL_HEIGHT - MIN_SPACE * 2 ; y > (MAX_SPACE + MIN_SPACE) / 2 ; y -= (Math.random() * (MAX_SPACE - MIN_SPACE)) + MIN_SPACE) {
            var i = parseInt((Math.random() * (4 - 1)) + 1);
            var x = (Math.random() * (550 - (350 + ((4 - i) * 50)))) + (350 + ((4 - i) * 50));
            if(rightPlatform) {
                x = (Math.random() * ((820 - ((4 - i) * 30)) - 650)) + 650;
            }
            rightPlatform = !rightPlatform;
            platform = this.platforms.create(x, y, this.arrayOfImages[i - 1]).refreshBody();

            this.maybeAddSacrifice(platform);
        }

        this.maxLine = platform.y + 50;
        platform.setTexture(this.arrayOfImages[3]).refreshBody();
    }

    maybeAddSacrifice(platform) {
        if(Math.random() < platform.y * A + 1) {
            var min = platform.x - platform.width / 2;
            var max = platform.x + platform.width / 2;
            var ennemy = this.physics.add.sprite((Math.random() * (max - min)) + min, platform.y - MIN_SPACE, this.arrayOfEnnemies[parseInt(Math.random() * 3)]).setScale(3);
            ennemy.point = false;
            ennemy.active = false;
            this.ennemies.push(ennemy);
            this.physics.add.existing(ennemy);
            this.physics.add.collider(ennemy, this.platforms);
            this.physics.add.collider(ennemy, this.player, this.push, null, ennemy);
        }
    }

    push() {
        this.active = true;
    }
}