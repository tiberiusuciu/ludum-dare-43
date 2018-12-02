import Player from '../sprite/Player.js';

export default class Tutorial1Scene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Tutorial1Scene'
        });
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/level_01.json");
        this.load.spritesheet("tiles",  "assets/spritesheet.png", { frameWidth: 32, frameHeight: 32 });
    }
    
    create() {
        var map = this.make.tilemap({ key: "map" });
        var tileset = map.addTilesetImage("tiles", "assets/spritesheet.png");
        // var layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        var tileLayer = map.createStaticLayer(0, tileset, 0, 0);
        var decorsLayer = map.createStaticLayer(1, tileset, 0, 0);
        var groundLayer = map.createStaticLayer(2, tileset, 0, 0);
        var wallLayer = map.createStaticLayer(3, tileset, 0, 0);

        console.log("BROCOLI");
        console.log(tileLayer);
        

        tileLayer.setCollisionByProperty({ collides: true });
        decorsLayer.setCollisionByProperty({ collides: true });
        groundLayer.setCollisionByProperty({ collides: true });
        console.log("BROCOLI");
        console.log(wallLayer);
        
        
        wallLayer.setCollisionByProperty({ collides: true });


        const debugGraphics = this.add.graphics().setAlpha(0.75);
        tileLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        
        decorsLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        groundLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        wallLayer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

    }

    update() {
    }
}