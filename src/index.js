import 'phaser';
import GameScene from './scene/GameScene';

var config = {
    type: Phaser.WEBGL,
    parent: 'content',
    pixelArt: true,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 500,
                debug: true
            }
        }
    },
    scene: [
        GameScene
    ]
};

new Phaser.Game(config);