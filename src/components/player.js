class Player extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.input = {
            "up": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            "left": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            "down": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            "right": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            "attack": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            "skill": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            "burst": this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        };

        this.camera = this.scene.cameras.getCamera("").startFollow(this.sprite);
        this.camera_zoom = 1;

        this.scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            this.camera_zoom -= deltaY * 0.001;
            if (this.camera_zoom > 3) this.camera_zoom = 3;
            if (this.camera_zoom < 1) this.camera_zoom = 1;
        });

        // custom properties
        this.speed = 100;
        this.cooldown = {
            "attack": {
                "max_time": 500,
                "current_time": 0
            },
            "skill": {
                "max_time": 0,
                "current_time": 0
            },
            "burst": {
                "max_time": 0,
                "current_time": 0,
                "max_mana": 0,
                "current_mana": 0
            },
            update(delay) {
                if (this.attack.current_time < this.attack.max_time) this.attack.current_time += delay;
                if (this.skill.current_time < this.skill.max_time) this.skill.current_time += delay;
                if (this.burst.current_time < this.burst.max_time) this.burst.current_time += delay;
            },
            isReadyToAttack() {
                return this.attack.current_time >= this.attack.max_time;
            },
            isReadyToSkill() {
                return this.skill.current_time >= this.skill.max_time;
            },
            isReadyToBurst() {
                return this.burst.current_time >= this.burst.max_time && this.burst.current_mana >= this.burst.max_mana;
            }
        };

        this.scene.time.addEvent({
            loop: true,
            callbackScope: this,
            delay: 100,
            callback: () => this.cooldown.update(100)
        });

        this.isPlayingAttackAnimation = false;
    }

    preload() {
        this.scene.load.spritesheet("player-spritesheet", "assets/crab-basic-spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        return this;
    }

    create() {
        this.scene.anims.create({
            key: "idle",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("player-spritesheet", { start: 0, end: 3 })
        });

        this.scene.anims.create({
            key: "run",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("player-spritesheet", { start: 4, end: 7 })
        });

        this.scene.anims.create({
            key: "dead",
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers("player-spritesheet", { start: 8, end: 11 })
        });


        this.scene.anims.create({
            key: "attack",
            frameRate: 10,
            frames: this.scene.anims.generateFrameNumbers("player-spritesheet", { start: 12, end: 15 })
        });

        this.sprite.setBodySize(14, 10, true).setOffset(9, 22);

        return this;
    }

    attack() {
        this.sprite.play("attack").on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => this.isPlayingAttackAnimation = false);
        this.cooldown.attack.current_time = 0;
        this.isPlayingAttackAnimation = true;
    }

    update() {
        // calculate and set velocity
        let x = 0, y = 0;
        if (this.input.up.isDown) y -= 1;
        if (this.input.down.isDown) y += 1;
        if (this.input.left.isDown) x -= 1;
        if (this.input.right.isDown) x += 1;

        this.sprite.setVelocity(x * this.speed, y * this.speed);

        // set flip x by current direction
        this.sprite.setFlipX(x == 0 ? this.sprite.flipX : (x < 0));

        // smooth zoom by mouse wheel
        if (Math.abs(this.camera_zoom - this.camera.zoom) > 0.1) {
            this.camera.setZoom(this.camera.zoom + (this.camera_zoom - this.camera.zoom) * 0.03);
        }

        if (this.input.attack.isDown && this.cooldown.isReadyToAttack()) {
            this.attack();
        }

        if (!this.isPlayingAttackAnimation) {
            if (x * x + y * y != 0) {
                this.sprite.play("run", true);
            } else {
                this.sprite.play("idle", true);
            }
        }

        return this;
    }
}