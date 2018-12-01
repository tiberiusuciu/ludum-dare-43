export default class Player extends Phaser.GameObjects.Sprite {
    constructor({scene, x, y, key}) {
        super(scene, x, y, key);

        scene.physics.world.enable(this);

        this.setTexture(key);
        this.setScale(3);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(500);

        console.log(this);
    }

    update(scene) {
        if (scene.cursors.left.isDown) {
            this.body.setVelocityX(-160);

            //this.anims.play('left', true);
        } else if (scene.cursors.right.isDown) {
            this.body.setVelocityX(160);

            //this.anims.play('right', true);
        } else {
            this.body.setVelocityX(0);

            //this.anims.play('turn');
        }

        if (scene.cursors.up.isDown && this.body.touching.down) {
            console.log('jump');
            this.body.setVelocityY(-330);
        }
    }
}