class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        this.load.spritesheet("crab-basic", "assets/crab-basic-spritesheet.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON("map", "assets/maps/tutorial.json");
    }

    create() {
        this.anims.create({
            key: "idle",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("crab-basic", { start: 0, end: 3 })
        });

        this.anims.create({
            key: "run",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("crab-basic", { start: 4, end: 7 })
        });

        this.anims.create({
            key: "dead",
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("crab-basic", { start: 8, end: 11 })
        });


        this.anims.create({
            key: "attack",
            frameRate: 4,
            frames: this.anims.generateFrameNumbers("crab-basic", { start: 12, end: 15 })
        });

        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("tileset");
        map.createLayer("TL1", tileset);
        map.createLayer("TL2", tileset);

        this.player = this.physics.add.sprite(20, 20, null);

        this.cameras.getCamera("").startFollow(this.player).setZoom(2);

        this.cursors = this.input.keyboard.addKeys({
            "up": Phaser.Input.Keyboard.KeyCodes.W,
            "down": Phaser.Input.Keyboard.KeyCodes.S,
            "left": Phaser.Input.Keyboard.KeyCodes.A,
            "right": Phaser.Input.Keyboard.KeyCodes.D,
            "attack": Phaser.Input.Keyboard.KeyCodes.J,
        });

        this.state = "idle";
    }

    update() {
        let x = 0, y = 0;
        if (this.cursors["up"].isDown) y -= 50;
        if (this.cursors["down"].isDown) y += 50;
        if (this.cursors["left"].isDown) x -= 50;
        if (this.cursors["right"].isDown) x += 50;

        if (x < 0) this.player.setFlipX(true);
        else if (x > 0) this.player.setFlipX(false);

        if (this.cursors["attack"].isDown) {
            this.state = "attack";
            this.player.play("attack", true).on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.state = "idle";
            });
        }

        if (this.state != "attack") {
            if (x * x + y * y != 0) {
                this.state = "run";
                this.player.play("run", true);
            } else {
                this.state = "idle";
                this.player.play("idle", true);
            }
        }

        this.player.setVelocity(x, y);
    }
}