class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        this.player = new Player(this, 20, 20).preload();
        this.enemy = new Slime(this, 100, 100, this.player).preload();

        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON("map", "assets/maps/tutorial.json");
    }

    create() {
        this.player.create();
        this.enemy.create();
        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("tileset");
        map.createLayer("TL1", tileset);
        map.createLayer("TL2", tileset);
    }

    update() {
        this.player.update();
        this.enemy.update();
    }
}