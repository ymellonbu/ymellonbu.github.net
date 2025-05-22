const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 320,
    parent: 'game',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true
};

let player;

function preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('player', 'assets/player.png');
}

function create() {
    this.add.image(240, 160, 'background');
    player = this.physics.add.sprite(240, 160, 'player');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.setVelocity(0);
    if (this.cursors.left.isDown) player.setVelocityX(-100);
    else if (this.cursors.right.isDown) player.setVelocityX(100);
    if (this.cursors.up.isDown) player.setVelocityY(-100);
    else if (this.cursors.down.isDown) player.setVelocityY(100);
}

new Phaser.Game(config);
