class GreenSlime extends Enemy {
    constructor(scene, x, y, player) {
        super(scene, x, y, player);

        this.speed = 30;
        this.focusRange = 200;
        this.isPlayingHitAnimation = false;
    }

    preload() {
        this.scene.load.spritesheet("greenslime-spritesheet", "assets/Slime_Sapp_Sheet_01.png", {
            frameWidth: 96,
            frameHeight: 112
        });

        return this;
    }

    create() {
        this.scene.anims.create({
            key: "g_normal",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("greenslime-spritesheet", { start: 0, end: 3 })
        });

        this.scene.anims.create({
            key: "g_move",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("greenslime-spritesheet", { start: 0, end: 3 })
        });

        this.scene.anims.create({
            key: "g_hit",
            frameRate: 10,
            frames: this.scene.anims.generateFrameNumbers("greenslime-spritesheet", { start: 15, end: 23 })
        });

        this.sprite.setCircle(30, 14, 8);
        
        //this.sprite.setCollideWorldBounds(true);
        
        this.scene.physics.add.collider(this.player.sprite, this.sprite, () => {
            // if (this.player.isPlayingAttackAnimation) {
            //     this.hit();
            //     //this.stats.current.hp -= this.player.stats.base.atk;
            // }
            this.hit();
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
            if (!this.isPlayingHitAnimation) this.sprite.play("g_move", true);
        } else {
            this.sprite.setVelocity(0, 0);
            if (!this.isPlayingHitAnimation) this.sprite.play("g_normal", true);
        }


    }

    hit() {
        this.sprite.play("g_hit", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.isPlayingHitAnimation = false);
        this.isPlayingHitAnimation = true;
    }
}