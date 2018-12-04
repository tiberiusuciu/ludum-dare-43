import Player from '../sprite/Player.js';

export default class Tutorial1Scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Tutorial1Scene'
        });
        this.isLeaving = false;

        this.arrayOfEnnemies = [
            'enemy_01',
            'enemy_02',
            'enemy_03',
            'enemy_04',
            'enemy_05',
            'enemy_06',
            'enemy_07',
            'enemy_08',
            'enemy_09',
            'enemy_10',
            'enemy_11',
            'enemy_12',
            'enemy_13',
            'enemy_14',
            'enemy_15',
            'enemy_16',
            'enemy_17',
            'enemy_18',
            'enemy_19',
            'enemy_20',
            'enemy_21',
            'enemy_22',
            'enemy_23',
            'enemy_24',
            'enemy_25',
            'enemy_26',
            'enemy_27',
            'enemy_28',
            'enemy_29',
            'enemy_30',
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

        this.load.image("tiles", "assets/spritesheet_extruded.png");
        this.load.tilemapTiledJSON("map", "assets/level_01.json");

        this.load.spritesheet('player', 'assets/player_strip10.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('playerjump', 'assets/player_jump_strip2.png',{ frameWidth: 16, frameHeight: 24 });

        this.load.audio('playerJumpSoundtrue', 'assets/jump.wav', {
            instances: 1
        });
        this.load.audio('playerJumpSoundfalse', 'assets/jump2.wav', {
            instances: 1
        });

        this.load.audio('bg_music', 'assets/bg_music.wav', {
            instances: 1
        });

        this.load.image('enemy_01', 'assets/enemy_01.png');
        this.load.image('enemy_02', 'assets/enemy_02.png');
        this.load.image('enemy_03', 'assets/enemy_03.png');
        this.load.image('enemy_04', 'assets/enemy_04.png');
        this.load.image('enemy_05', 'assets/enemy_05.png');
        this.load.image('enemy_06', 'assets/enemy_06.png');
        this.load.image('enemy_07', 'assets/enemy_07.png');
        this.load.image('enemy_08', 'assets/enemy_08.png');
        this.load.image('enemy_09', 'assets/enemy_09.png');
        this.load.image('enemy_10', 'assets/enemy_10.png');
        this.load.image('enemy_11', 'assets/enemy_11.png');
        this.load.image('enemy_12', 'assets/enemy_12.png');
        this.load.image('enemy_13', 'assets/enemy_13.png');
        this.load.image('enemy_14', 'assets/enemy_14.png');
        this.load.image('enemy_15', 'assets/enemy_15.png');
        this.load.image('enemy_16', 'assets/enemy_16.png');
        this.load.image('enemy_17', 'assets/enemy_17.png');
        this.load.image('enemy_18', 'assets/enemy_18.png');
        this.load.image('enemy_19', 'assets/enemy_19.png');
        this.load.image('enemy_20', 'assets/enemy_20.png');
        this.load.image('enemy_21', 'assets/enemy_21.png');
        this.load.image('enemy_22', 'assets/enemy_22.png');
        this.load.image('enemy_23', 'assets/enemy_23.png');
        this.load.image('enemy_24', 'assets/enemy_24.png');
        this.load.image('enemy_25', 'assets/enemy_25.png');
        this.load.image('enemy_26', 'assets/enemy_26.png');
        this.load.image('enemy_27', 'assets/enemy_27.png');
        this.load.image('enemy_28', 'assets/enemy_28.png');
        this.load.image('enemy_29', 'assets/enemy_29.png');
        this.load.image('enemy_30', 'assets/enemy_30.png');
    }
    
    create() {
        const map = this.make.tilemap({ key: "map"});
        this.ennemies = [];
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tutorials", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const backwallLayer = map.createStaticLayer("Back Wall", tileset, 0, 0).setScale(3);
        const wallsLayer = map.createStaticLayer("Walls", tileset, 0, 0).setScale(3);
        const wallDecorationsLayer = map.createStaticLayer("Wall Decorations", tileset, 0, 0).setScale(3);
        const firstFrameLayer = map.createStaticLayer("First Frame", tileset, 0, 0).setScale(3);
        const secondFrameLayer = map.createStaticLayer("Secondary Frame", tileset, 0, 0).setScale(3);
        const moreDecorationsLayer = map.createStaticLayer("More Decorations", tileset, 0, 0).setScale(3);


        wallsLayer.setCollisionByProperty({ collides: true });
        wallDecorationsLayer.setCollisionByProperty({ collides: true });
        firstFrameLayer.setCollisionByProperty({ collides: true });
        secondFrameLayer.setCollisionByProperty({ collides: true });
        moreDecorationsLayer.setCollisionByProperty({ collides: true });
        backwallLayer.setCollisionByProperty({ collides: true });


        this.player = new Player({
            scene: this,
            x: 64 * 3,
            y: 240
        });
        this.add.existing(this.player);


        this.physics.add.collider(this.player, wallsLayer);
        this.physics.add.collider(this.player, wallDecorationsLayer);
        this.physics.add.collider(this.player, firstFrameLayer);
        this.physics.add.collider(this.player, secondFrameLayer);
        this.physics.add.collider(this.player, moreDecorationsLayer);
        this.physics.add.collider(this.player, backwallLayer);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };

        if(!this.game.bgmusic) {
            this.sound.play('bg_music', {
                loop: true,
                volume: 0.2
            });
            this.game.bgmusic = true;
        }


        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.scene.start('GameScene');
        }, this);

        this.isLeaving = false;

        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        var add = this.add;

        WebFont.load({
            custom: {
                families: [ 'proggy' ]
            },
            active: function ()
            {
                add.text(125, 135, 'Move with WASD or the arrow keys! ', { fontFamily: 'proggy', fontSize: 32, color: '#000' });
                add.text(125, 165, 'Jump with space (or W/Up arrow)! ', { fontFamily: 'proggy', fontSize: 32, color: '#000' });


                add.text(800, 165, 'Push people off by walking into them! ', { fontFamily: 'proggy', fontSize: 32, color: '#000' });
            }
        });

        var ennemy = this.physics.add.sprite(900, 64 * 3, this.arrayOfEnnemies[Math.round(Math.random() * this.arrayOfEnnemies.length - 1)]).setScale(3);
        ennemy.flipX = Math.random() > 0.5 ? true : false;
        ennemy.point = false;
        ennemy.active = false;
        this.ennemies.push(ennemy);
        this.physics.add.existing(ennemy);
        this.physics.add.collider(ennemy, firstFrameLayer);
        this.physics.add.collider(ennemy, secondFrameLayer);
        this.physics.add.collider(ennemy, this.player, this.push, null, ennemy);

    }

    push() {
        this.active = true;
    }

    update() {
        this.player.update(this);
        
        // Check for transition
        if (this.player.x >= 17 * 32 * 3 && !this.isLeaving) {
            this.isLeaving = true;
            this.cameras.main.fadeOut(1000);
        }

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
        // for(var i = 0 ; i < this.ennemies.length ; ++i) {
        //     var ennemy = this.ennemies[i];
        //     if(ennemy.active) {
        //         if(!ennemy.body.point && !ennemy.body.blocked.down) {
        //             ennemy.point = true;
        //         }
        //         if(ennemy.y > this.lineHeight) {
        //             ennemy.setActive(false);
        //             if(ennemy.point) {
        //                 this.waitLinePoint += 25;
        //             }
        //         }
        //     }
        // }
    }
}