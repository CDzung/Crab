class Lobby extends Phaser.Scene {
    constructor() {
        super("Lobby");
    }

    preload() {
        this.load.image("game-title", "assets/game-title.png");
        this.load.video("bg", "assets/lobby.mp4");
    }

    create() {
        this.add
            .video(0, 0, "bg")
            .setOrigin(0, 0)
            .setScale(this.scale.width / 640)
            .play()
            .on(Phaser.GameObjects.Events.VIDEO_COMPLETE, () => this.scene.start("Tutorial"));

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.space.isDown) {
            this.scene.start("Tutorial");
        }
    }
}