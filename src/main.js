// Chờ web load xong thì tạo game
window.addEventListener("load", (ev) => {
    // Tạo một Phaser.Game lưu vào biến game
    var game = new Phaser.Game({
        type: Phaser.AUTO,  // Loại renderer là AUTO
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
        // Setting physics cho game
        physics: {
            default: "arcade",  // loại cơ chế vật lý là arcade
            arcade: {
                gravity: {},    // trọng lực = 0
                debug: true     // mở debug để thấy collision box của các vật thể
            }
        },

        // Load 2 cảnh vào game (Lobby và Tutorial)
        scene: [Lobby, Tutorial]
    });
});