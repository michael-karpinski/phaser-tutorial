import Player from "./characters/Player.js"
import Platforms from "./obstacles/Platforms.js"
import Stars from "./pickups/Stars.js"
import Bombs from "./enemies/Bombs.js"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

const game = new Phaser.Game(config)

function preload() {
  this.load.image("sky", "../assets/sky.png")
  this.load.image("ground", "../assets/platform.png")
  this.load.image("star", "../assets/star.png")
  this.load.image("bomb", "../assets/bomb.png")
  this.load.spritesheet("dude", "../assets/dude.png", { frameWidth: 32, frameHeight: 48 })
}

function create() {
  this.add.image(400, 300, "sky")
  
  this.platforms = new Platforms(this)
  this.player = new Player(this)
  this.stars = new Stars(this)
  this.bombs = new Bombs(this)

  setupCollision(this)
}

function update() {
  this.player.update()
}

function setupCollision(game) {
  game.physics.add.collider(game.player.sprite, game.platforms.group)
  game.physics.add.collider(game.platforms.group, game.stars.group)
  game.physics.add.collider(game.platforms.group, game.bombs.group)
  game.physics.add.collider(game.player.sprite, game.bombs.group, game.player.hitByBomb, null, game.player)
  game.physics.add.collider(game.bombs.group, game.bombs.group)
  game.physics.add.overlap(game.player.sprite, game.stars.group, game.player.collectStar, null, game.player)
}