import Player from '../sprite/Player.js';

export default class Tutorial1Scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'TitleScene'
        });
        this.isLeaving = false;
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

        this.load.image("tiles", "assets/spritesheet.png");
        this.load.tilemapTiledJSON("map", "assets/level_01.json");

        this.load.audio('bg_music', 'assets/bg_music.wav', {
            instances: 1
        });
    }
    
    create() {
        const map = this.make.tilemap({ key: "map"});

        // // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tutorials", "tiles");

        // // Parameters: layer name (or index) from Tiled, tileset, x, y
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

        if(!this.game.bgmusic) {

            this.game.song = this.sound.add('bg_music', {loop: true, volume: 0.2});
            this.game.song.play();
            this.game.bgmusic = true;
        }

        var rect = new Phaser.Geom.Rectangle(0, 0, 1200, 600);

        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });

        graphics.fillRectShape(rect);
        graphics.setAlpha(.75);

        var add = this.add;

        var pargap = 50;

        WebFont.load({
            custom: {
                families: [ 'proggy' ]
            },
            active: function ()
            {
                add.text(25, 25, 'Ludum ', { fontFamily: 'proggy', fontSize: 64, color: '#e15c38' });
                add.text(150, 25, 'Dare ', { fontFamily: 'proggy', fontSize: 64, color: '#ec9431' });
                add.text(250, 25, '43 ', { fontFamily: 'proggy', fontSize: 64, color: '#fade37' });


                add.text(25, 95, 'Tiberiusuciu and Guillaume-baril Presents:', { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });
                add.text(25, 130, 'Sacrifice', { fontFamily: 'proggy', fontSize: 40, color: '#ec3182' });
                add.text(162, 130, 'Royale', { fontFamily: 'proggy', fontSize: 40, color: '#42f4c8' });


                add.text(25, 170 + pargap, 'Welcome to our Ludum Dare 43 entry!', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 200 + pargap, 'The theme is "Sacrifices Must Be Made" so I present you our game!', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 230 + pargap, 'You have been selected amongst many others to a race to the top of the worlds tallest building.', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 260 + pargap, 'There can only be one winner and you may use any means to get to the top.', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 290 + pargap, 'In addition, there is a rapid moving laser, scanning the building from the bottom to the top.', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 320 + pargap, 'It eliminates everyone that goes under it.', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(25, 350 + pargap, 'When scanning someone, the laser takes some time to process the individual.', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                
                add.text(25, 430 + pargap, 'Press <M> to muste the music', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });
                add.text(25, 450 + pargap, 'Press <enter> to start!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });
                add.text(25, 470 + pargap, 'Press <space> to skip the tutorials!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });

                add.text(750, 150, 'Controls', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(750, 160, '____________________________________', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });


                add.text(750, 200, '- Move with WASD or Arrows', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(750, 230, '- Jump with space (or W/Up arrow)', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });


                add.text(750, 290, 'How to play', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(750, 300, '____________________________________', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });

                add.text(750, 340, '- Climb to the top as fast as you can!', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(750, 370, '- Do not let the laser go above you!', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(750, 400, '- Push your competition off the ledges', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });
                add.text(764, 420,  'to slow down the laser!', { fontFamily: 'proggy', fontSize: 20, color: '#fff' });


                add.text(890, 500,  '*No one is hurt when thrown off the building', { fontFamily: 'proggy', fontSize: 15, color: '#AAA' });
                add.text(890, 520,  'strong safety matts are at the bottom to catch them', { fontFamily: 'proggy', fontSize: 15, color: '#AAA' });
                add.text(890, 540,  '(We promise!)', { fontFamily: 'proggy', fontSize: 15, color: '#AAA' });
            }
        });


        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {

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

        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.scene.start('Tutorial1Scene');
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.scene.start('GameScene');
        }
    }
}