import 'phaser';
import GameScene from './scene/GameScene';
import Tutorial1Scene from './scene/Tutorial1Scene';

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
        GameScene,
        Tutorial1Scene
    ]
};

new Phaser.Game(config);