const SCALE = 3;
const JUMP_ANIM = 300;

export default class Player extends Phaser.GameObjects.Sprite {
    constructor({scene, x, y, useLerp=false}) {
        super(scene, x, y, 'player');

        scene.physics.world.enable(this);

        this.setScale(SCALE);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(false);
        this.jumpVelocity = useLerp ? -1000 : -750;
        //this.body.setGravityY(1000);

        scene.anims.create({
            key: 'move',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 9 }),
            frameRate: 20,
            repeat: -1
        });
        
        scene.anims.create({
            key: 'stop',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'jumpUp',
            frames: [ { key: 'playerjump', frame: 0 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'jumpDown',
            frames: [ { key: 'playerjump', frame: 1 } ],
            frameRate: 20
        });

        scene.cameras.main.startFollow(this);
        if (useLerp) {
            scene.cameras.main.setLerp(0, 0.1);
        }

        this.loudJump = false;
    }

    update(scene) {
        var left = scene.cursors.left.isDown || scene.wasd.left.isDown;
        var right = scene.cursors.right.isDown || scene.wasd.right.isDown;
        var up = scene.cursors.up.isDown || scene.wasd.up.isDown || scene.cursors.space.isDown;

        if (left || right) {
            var direction = right ? 1 : -1;

            this.body.setVelocityX(300 * direction);
            this.flipX = direction != 1;
            this.anims.play('move', true);
        } else {
            this.body.setVelocityX(0);
            this.anims.play('stop');
        }
        

        if (up && (this.body.touching.down || this.body.blocked.down)) {
            scene.sound.play('playerJumpSound' + this.loudJump);
            this.loudJump = !this.loudJump;
            this.body.setVelocityY(this.jumpVelocity);
        }

        if(this.body.velocity.y < -JUMP_ANIM) {
            this.anims.play('jumpUp');
        } else if (this.body.velocity.y > JUMP_ANIM) {
            this.anims.play('jumpDown');
        }
    }
}