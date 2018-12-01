import 'phaser';
import GameScene from './scene/GameScene';

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
            debug: true
        }
    },
    scene: [
        GameScene
    ]
};

new Phaser.Game(config);