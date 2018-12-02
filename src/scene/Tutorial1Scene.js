import Player from '../sprite/Player.js';

export default class Tutorial1Scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Tutorial1Scene'
        });
    }

    preload() {

        this.load.image("tiles", "assets/spritesheet.png");
        this.load.tilemapTiledJSON("map", "assets/level_01.json");

        this.load.spritesheet('player', 'assets/player_strip10.png',{ frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('playerjump', 'assets/player_jump_strip2.png',{ frameWidth: 16, frameHeight: 24 });
    }
    
    create() {

        const map = this.make.tilemap({ key: "map"});

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

    }

    update() {
        this.player.update(this);

        // Check for transition
    }
}