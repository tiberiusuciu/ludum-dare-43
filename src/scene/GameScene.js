import Player from '../sprite/Player.js';

const LEVEL_HEIGHT = 24000;
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

    init() {
        //  Inject our CSS
        var element = document.createElement('style');

        document.head.appendChild(element);

        var sheet = element.sheet;

        var styles = '@font-face { font-family: "proggy"; src: url("assets/fnt_proggy/ProggyTiny.ttf") format("truetype"); }\n';

        sheet.insertRule(styles, 0);
    }

    preload() {

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

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
        this.load.image('laser-indicator', 'assets/laser_indicator.png');
        this.load.image('end-indicator', 'assets/end_indicator.png');
        this.load.image('sacrifice-indicator', 'assets/sacrifice_indicator.png');

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
        this.cameras.main.win = false;
        this.city = this.add.tileSprite(600, 300, 1200, 600, 'city');
        this.city.setScrollFactor(0);
        this.scrollingBg = this.add.tileSprite(600, LEVEL_HEIGHT / 2, 600, LEVEL_HEIGHT + 400, 'building-bg');


        this.game.ennemies = [];
        this.game.points = 0;
        this.player = new Player({
            scene: this,
            x: 550,
            y: LEVEL_HEIGHT - MAX_SPACE * 1.2,
            useLerp: true
        });
        this.add.existing(this.player);

        this.sacrifices = [];
        this.generatePlatforms();

        this.skyColor = new Phaser.Display.Color(77, 195, 255);
        this.spaceColor = new Phaser.Display.Color(0, 31, 49);

        this.createKeyboard();

        this.physics.add.collider(this.player, this.platforms);

        this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xcc2900 } });
        this.lineHeight = LEVEL_HEIGHT;
        this.lineGap = -1;
        this.speedUpEach = 120;
        this.speedCounter = 0;
        this.line = new Phaser.Geom.Line(-1000, this.lineHeight, 2000, this.lineHeight);

        this.laserIndicatorSprite = this.add.sprite(600, 550, 'laser-indicator');
        this.laserIndicatorSprite.setScrollFactor(0);
        this.laserIndicatorSprite.setScale(2);
        this.laserIndicatorSprite.setAlpha(.75);

        this.endIndicatorSprite = this.add.sprite(600, 50, 'end-indicator');
        this.endIndicatorSprite.setScrollFactor(0);
        this.endIndicatorSprite.setScale(2);
        this.endIndicatorSprite.setAlpha(.75);

        //this.sacrificeSprite = this.add.sprite(20, 25, 'sacrifice-indicator');
        //this.sacrificeSprite.setScrollFactor(0);
        //this.sacrificeSprite.setScale(2);
        //this.sacrificeSprite.setAlpha(.75);

        this.lineDistance = this.add.text(1100, 550, '0m', { fontSize: '20px', fill: '#cc2900' });
        this.lineDistance.setScrollFactor(0);

        this.endDistance = this.add.text(1100, 550, '0m', { fontSize: '20px', fill: '#fff' });
        this.endDistance.setScrollFactor(0);

        this.sacrificeText = this.add.text(1100, 550, '0m', { fontSize: '20px', fill: '#fff' });
        this.sacrificeText.setScrollFactor(0);

        this.isDying = false;
        this.deathText = this.add.text(620, 250, '', { fontSize: '600px', fill: '#cc2900' }).setAlpha(0.5).setOrigin(0.5);
        this.deathText.setScrollFactor(0);

        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            if(!camera.win) {
                this.scene.start('GameOverScene');
            } else {
                this.scene.start('FinishScene');
            }
        }, this);

        if(!this.game.bgmusic) {
            this.sound.play('bg_music', {
                loop: true,
                volume: 0.2
            });
            this.game.bgmusic = true;this.scene.start('Tutorial1Scene');
        }

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        this.player.update(this);

        var hexColor = Phaser.Display.Color.Interpolate.ColorWithColor(this.spaceColor, this.skyColor, LEVEL_HEIGHT, this.player.y);
        this.cameras.main.setBackgroundColor(hexColor);

        if(!this.cameras.main.win && this.player.y <= this.maxLine) {
            this.cameras.main.win = true;
            this.cameras.main.fadeOut(2000);
        }

        var distanceFromLine = parseInt((this.line.y1 - this.player.y - this.player.height / 2) / 28);
        var distanceFromEnd = parseInt((this.player.y - this.player.height / 2) / 28);
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
            this.cameras.main.shake(100, ((distanceFromLine - 10) * -1) * 0.01 / 200);
        } else {
            this.cameras.main.shake(0);
        }

        var lineDistance = this.lineDistance;
        var endDistance = this.endDistance;
        var sacrificeText = this.sacrificeText;
        var score = this.game.points;

        WebFont.load({
            custom: {
                families: [ 'proggy' ]
            },
            active: function ()
            {

                if(distanceFromLine >= 11) {
                    lineDistance.setText(distanceFromLine + 'm');
                    lineDistance.setColor(distanceFromLine < 50 ? '#cc2900' : '#28ff41');
                    lineDistance.setFontFamily('proggy')
                    lineDistance.x = 610;
                    lineDistance.y = 535;
                    lineDistance.setFontSize(32);
                } else {
                    lineDistance.setText('JUMP!');
                    lineDistance.setColor(distanceFromLine < 50 ? '#cc2900' : '#28ff41');
                    lineDistance.setFontFamily('proggy')
                    lineDistance.x = 610;
                    lineDistance.y = 540;
                    lineDistance.setFontSize(26);
                }

                endDistance.setText(distanceFromEnd + 'm');
                endDistance.setColor('#fff');
                endDistance.setFontFamily('proggy')
                endDistance.x = 610;
                endDistance.y = 37;
                endDistance.setFontSize(32);

                sacrificeText.setText("Sacrifices: " + score);
                sacrificeText.setColor('#fff');
                sacrificeText.setFontFamily('proggy')
                sacrificeText.x = 25;
                sacrificeText.y = 37;
                sacrificeText.setFontSize(32);
            }
        });

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

        for(var i = 0 ; i < this.game.ennemies.length ; ++i) {
            var ennemy = this.game.ennemies[i];
            if(ennemy.active) {
                if(!ennemy.body.point && !ennemy.body.blocked.down) {
                    ennemy.point = true;
                }
                if(ennemy.y > this.lineHeight) {
                    ennemy.setActive(false);
                    if(ennemy.point) {
                        this.waitLinePoint += 25;
                        this.game.points++;
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

        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            if (!this.game.isMuted) {
                this.game.isMuted = true;
                this.game.song.mute = true;
            }
            else {
                this.game.isMuted = false;
                this.game.song.mute = false;
            }
        }
    }

    deathTimer() {
        this.deathText.setText(this.timer.getRepeatCount());
        this.deathText.setFontFamily('proggy')
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
            var ennemy = this.physics.add.sprite((Math.random() * (max - min)) + min, platform.y - MIN_SPACE, this.arrayOfEnnemies[Math.round(Math.random() * 3)]).setScale(3);
            ennemy.flipX = Math.random() > 0.5 ? true : false;
            ennemy.point = false;
            ennemy.active = false;
            this.game.ennemies.push(ennemy);
            this.physics.add.existing(ennemy);
            this.physics.add.collider(ennemy, this.platforms);
            this.physics.add.collider(ennemy, this.player, this.push, null, ennemy);
        }
    }



    push() {
        this.active = true;
    }
}