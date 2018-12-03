const LEVEL_HEIGHT = 1000;

export default class FinishScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'FinishScene'
        });
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
        this.load.image('city', 'assets/city.png');
    }
    
    create() {
        this.city = this.add.tileSprite(600, 300, 1200, 600, 'city');
        this.scrollingBg = this.add.tileSprite(600, LEVEL_HEIGHT / 2, 600, LEVEL_HEIGHT + 400, 'building-bg');
        this.cameras.main.setBackgroundColor("rgb(77, 195, 255)");

        var rect = new Phaser.Geom.Rectangle(0, 0, 1200, 600);

        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });

        graphics.fillRectShape(rect);
        graphics.setAlpha(.75);


        var add = this.add;
        var points = this.game.points;

        var pargap = 50;

        WebFont.load({
            custom: {
                families: [ 'proggy' ]
            },
            active: function ()
            {
                add.text(525, 125, 'YOU WON! ', { fontFamily: 'proggy', fontSize: 64, color: '#28ff41' });

                add.text(370, 185, 'Unlike everyone else, you got to the top!', { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });
                add.text(370, 215, 'You sacrificed ' + this.game.points + " competitors!", { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });

                add.text(25, 430 + pargap, 'Press <M> to muste the music', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });
                add.text(25, 450 + pargap, 'Press <enter> to go back to the title screen!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });
                add.text(25, 470 + pargap, 'Press <space> to play again!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });

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

        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.scene.start('TitleScene');
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.scene.start('GameScene');
        }
    }
}