export default class Bombs {
  constructor(game) {
    this.game = game
    this.group = this.game.physics.add.group()
  }

  addBomb() {
    const x = (this.game.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = this.group.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}