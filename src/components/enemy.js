class Enemy extends Entity {
    constructor(scene, x, y, player) {
        super(scene, x, y);
        
        if (player instanceof Player) this.player = player;
    }
}