window.addEventListener("load", (ev) => {
    var game = new Phaser.Game({
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
            parent: 'game',
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1366,
            height: 768
        },
        audio: {
            disableWebAudio: true
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {},
                debug: false
            }
        },

        scene: [Lobby, Tutorial]
    });
});