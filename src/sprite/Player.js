export default class Player extends Phaser.GameObjects.Sprite {
    constructor({scene, x, y, key}) {
        super(scene, x, y, key);

        scene.physics.world.enable(this);

        this.setTexture(key);
        this.setScale(3);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(false);
        this.body.setGravityY(500);

        scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1
        });
        
        scene.anims.create({
            key: 'stop',
            frames: [ { key: key, frame: 0 } ],
            frameRate: 20
        });

        console.log(this);
    }

    update(scene) {
        if (scene.cursors.left.isDown || scene.cursors.right.isDown) {
            var direction = scene.cursors.right.isDown ? 1 : -1;

            this.body.setVelocityX(160 * direction);

            this.setScale(3 * direction, 3);
            this.anims.play('move', true);
        } else {
            this.body.setVelocityX(0);

            this.anims.play('stop');
        }

        if (scene.cursors.up.isDown) {
            this.body.setVelocityY(-330);
        }
    }
}