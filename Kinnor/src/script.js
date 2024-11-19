
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky','assets/sky3.png');
    this.load.image('ground','assets/platform3.png');
    this.load.image('star','assets/star.png');
    this.load.image('bomb','assets/bomb.png');
    this.load.spritesheet('dude','assets/dude.png',{frameWidth: 32, frameHeight: 48});
}

function create() {
    this.add.image(400, 300, 'sky');
    Platforms = this.physics.add.staticGroup();

    Platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    Platforms.create(600, 400, 'ground');
    Platforms.create(50, 250, 'ground');
    Platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true)
    player.setBounce(0.2);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
        framRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        framRate: 20,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
        framRate: 10,
        repeat: -1
    });
    
    player.body.setGravityY(300);

    this.physics.add.collider(player, Platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if(cursors.left.isDown){
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if(cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-550);
    }

}