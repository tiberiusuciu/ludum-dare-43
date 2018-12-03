import 'phaser';
import GameScene from './scene/GameScene';
import Tutorial1Scene from './scene/Tutorial1Scene';
import FinishScene from './scene/FinishScene';
import TitleScene from './scene/TitleScene';
import GameOver from './scene/GameOverScene';

var config = {
    type: Phaser.WEBGL,
    parent: 'content',
    pixelArt: true,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 2500
            },
            debug: false
        }
    },
    scene: [
        TitleScene,
        Tutorial1Scene,
        GameScene,
        FinishScene,
        GameOver
    ]
};

window.game = new Phaser.Game(config);

window.game.bgmusic = false;