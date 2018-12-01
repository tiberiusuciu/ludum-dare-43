const SCALE = 3;
const JUMP_ANIM = 300;

export default class Player extends Phaser.GameObjects.Sprite {
    constructor({scene, x, y, key}) {
        super(scene, x, y, key);

        scene.physics.world.enable(this);

        this.setScale(SCALE);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(false);
        //this.body.setGravityY(1000);

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

        scene.anims.create({
            key: 'jumpUp',
            frames: [ { key: key + 'jump', frame: 0 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'jumpDown',
            frames: [ { key: key + 'jump', frame: 1 } ],
            frameRate: 20
        });

        scene.cameras.main.startFollow(this);
        scene.cameras.main.setLerp(0, 0.1);
        
        console.log(this.body);
    }

    update(scene) {
        if (scene.cursors.left.isDown || scene.cursors.right.isDown) {
            var direction = scene.cursors.right.isDown ? 1 : -1;

            this.body.setVelocityX(300 * direction);
            this.flipX = direction != 1;
            this.anims.play('move', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('stop');
        }

        if (scene.cursors.up.isDown ) {
            this.body.setVelocityY(-1000);
        }

        if(this.body.velocity.y < -JUMP_ANIM) {
            this.anims.play('jumpUp');
        } else if (this.body.velocity.y > JUMP_ANIM) {
            this.anims.play('jumpDown');
        }
    }
}