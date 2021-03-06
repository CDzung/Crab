class Tutorial extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    preload() {
        this.player = new Player(this, -100, -100).preload();
        this.enemy1 = new BlueSlime(this, 400, 100, this.player).preload();
        this.enemy2 = new PinkSlime(this, 300, -200, this.player).preload();
        this.enemy3 = new GreenSlime(this, -200, 100, this.player).preload();

        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON("map", "assets/maps/tutorial.json");
        this.load.audio("theme-song", "assets/audio/theme-song.mp3");
        
    }

    create() {
        this.theme_song = this.sound.add("theme-song");
        this.player.create();

        this.enemy1.create();
        this.enemy2.create();
        this.enemy3.create();

        var gr = this.physics.add.group([
            this.enemy1.sprite,
            this.enemy2.sprite,
            this.enemy3.sprite
        ]);

        this.physics.add.collider(gr, gr);

        const map = this.add.tilemap("map");
        const tileset = map.addTilesetImage("tileset");
        map.createLayer("TL1", tileset);
        map.createLayer("TL2", tileset);

        this.theme_song.play();
    }

    update() {
        this.player.update();
        this.enemy1.update();
        this.enemy2.update();
        this.enemy3.update();
    }
}