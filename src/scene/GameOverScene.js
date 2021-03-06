const LEVEL_HEIGHT = 1000;

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOverScene'
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
        this.cameras.main.setBackgroundColor("rgb(24, 152, 217)");

        var rect = new Phaser.Geom.Rectangle(0, 0, 1200, 600);

        var graphics = this.add.graphics({ fillStyle: { color: 0x000000 } });

        graphics.fillRectShape(rect);
        graphics.setAlpha(.75);


        var add = this.add;

        var pargap = 50;

        var points = this.game.points;
        var distance = this.game.distanceFromEnd;

        WebFont.load({
            custom: {
                families: [ 'proggy' ]
            },
            active: function ()
            {
                add.text(525, 125, 'YOU LOST! ', { fontFamily: 'proggy', fontSize: 64, color: '#e20000' });


                add.text(495, 185, 'Unlike some, you fell!', { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });
                add.text(540, 215, '* and landed safely *', { fontFamily: 'proggy', fontSize: 20, color: '#aaa' });

                add.text(650, 475, 'You had ' + distance + 'm left to climb!', { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });
                add.text(650, 500, 'You sacrificed ' + (points == 0 ? "nobody" : (points + (points > 1 ? " competitors" : ' competitor'))) + " along the way!", { fontFamily: 'proggy', fontSize: 32, color: '#FFF' });

                add.text(25, 430 + pargap, 'Press <M> to mute the music', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });                
                add.text(25, 450 + pargap, 'Press <space> to go back to the title screen!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });
                add.text(25, 470 + pargap, 'Press <enter> to play again!', { fontFamily: 'proggy', fontSize: 20, color: '#f0f' });

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
            this.scene.start('TitleScene');
        }
        
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
            this.scene.start('GameScene');
        }
    }
}