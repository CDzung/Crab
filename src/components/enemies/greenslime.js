class GreenSlime extends Enemy {
    constructor(scene, x, y, player) {
        super(scene, x, y, player);

        this.speed = 30;
        this.focusRange = 200;
        this.isPlayingHitAnimation = false;
    }

    preload() {
        this.scene.load.spritesheet("spritesheet-green-slime", "assets/spritesheet-green-slime.png", {
            frameWidth: 96,
            frameHeight: 96
        });

        return this;
    }

    create() {
        this.scene.anims.create({
            key: "green-slime-normal",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-green-slime", { start: 0, end: 3 })
        });

        this.scene.anims.create({
            key: "green-slime-attack",
            frameRate: 10,
            frames: this.scene.anims.generateFrameNumbers("spritesheet-green-slime", { start: 16, end: 23 })
        });

        this.sprite.setCircle(10, 38, 38);

        //this.sprite.setCollideWorldBounds(true);

        this.scene.physics.add.collider(this.player.sprite, this.sprite, () => {
            this.attack();
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
        } else if (!this.isPlayingHitAnimation)  {
            this.sprite.setVelocity(0, 0);
        }

        if (!this.isPlayingHitAnimation) this.sprite.play("green-slime-normal", true);
        else {
            const vecNor = vector2player.normalize();

            if (vector2player.length() < 30) {
                this.player.sprite.setVelocity(vecNor.x * 1000, vecNor.y * 1000);
            }
        }
    }

    attack() {
        this.sprite.setCircle(30, 18, 18);
        this.sprite.play("green-slime-attack", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isPlayingHitAnimation = false;
            this.sprite.setCircle(10, 38, 38);
        });
        this.isPlayingHitAnimation = true;
    }
}