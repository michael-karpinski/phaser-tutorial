export default class Platforms {
  constructor(game) {
    this.group = game.physics.add.staticGroup()
    this.createPlatforms()
  }

  createPlatforms() {
    this.group.create(400, 568, "ground").setScale(2).refreshBody()
    this.group.create(600, 400, "ground")
    this.group.create(50, 250, "ground")
    this.group.create(750, 220, "ground")
  }
}