import 'phaser';
import GameScene from './scene/GameScene';
import Tutorial1Scene from './scene/Tutorial1Scene';
import FinishScene from './scene/FinishScene';

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
        Tutorial1Scene,
        GameScene,
        FinishScene 
    ]
};

window.game = new Phaser.Game(config);

window.game.bgmusic = false;