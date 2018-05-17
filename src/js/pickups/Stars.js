export default class Stars {
  constructor(game) {
    this.game = game
    this.group = this.setupGroup()
    this.bounceLimits = [0.2, 0.5]
    this.setBounce()
  }

  setupGroup() {
    return this.game.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })
  }

  setBounce() {
    this.group.children.iterate(child => child.setBounceY(Phaser.Math.FloatBetween(this.bounceLimits[0], this.bounceLimits[1])))
  }

  resetStars() {
    this.group.children.iterate(child => child.enableBody(true, child.x, 0, true, true))
  }
}