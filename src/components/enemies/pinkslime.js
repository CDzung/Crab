class PinkSlime extends Enemy {
    constructor(scene, x, y, player) {
        super(scene, x, y, player);

        this.speed = 30;
        this.focusRange = 200;
        this.isPlayingHitAnimation = false;
    }

    preload() {
        this.scene.load.spritesheet("spritesheet-pink-slime", "assets/spritesheet-pink-slime.png", {
            frameWidth: 44,
            frameHeight: 44
        });

        return this;
    }

    create() {
        this.scene.anims.create({
            key: "pink-slime-normal",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-pink-slime", { start: 0, end: 9 })
        });


        this.scene.anims.create({
            key: "pink-slime-hit",
            frameRate: 10,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-pink-slime", { start: 10, end: 14 })
        });

        this.sprite.setCircle(14, 8, 14);

        this.scene.physics.add.collider(this.player.sprite, this.sprite, () => {
            if (this.player.isPlayingAttackAnimation) {
                this.hit();
            }
        });

        return this;
    }

    update() {
        let vector2player = {
            x: this.player.sprite.x - this.sprite.x,
            y: this.player.sprite.y - this.sprite.y,
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            normalize() {
                let len = this.length();
                return {
                    x: this.x / len,
                    y: this.y / len
                }
            }
        }

        if (vector2player.length() < this.focusRange) {
            let { x, y } = vector2player.normalize();
            this.sprite.setVelocity(x * this.speed, y * this.speed);
            this.sprite.setFlipX(x != 0 ? (x > 0) : this.sprite.flipX);
        } else {
            this.sprite.setVelocity(0, 0);
        }

        if (!this.isPlayingHitAnimation) this.sprite.play("pink-slime-normal", true);
    }

    hit() {
        this.sprite.play("pink-slime-hit", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.isPlayingHitAnimation = false);
        this.isPlayingHitAnimation = true;
    }
}