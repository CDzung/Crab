class Entity {
    constructor(scene, x, y) {
        if (scene instanceof Phaser.Scene) {
            this.stats = {
                "base": {
                    "hp": 0,
                    "atk": 0,
                    "def": 0
                },
                "current": {
                    "hp": 0,
                    "atk": 0,
                    "def": 0
                }
            }

            this.scene = scene;
            this.sprite = this.scene.physics.add.sprite(x, y, null).setDepth(10);
        }
    }

    preload() { }

    create() { }

    update() { }
}