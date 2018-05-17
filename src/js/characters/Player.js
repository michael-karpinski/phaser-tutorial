export default class Player {
  constructor(game) {
    this.game = game
    this.sprite = game.physics.add.sprite(100, 450, "dude")
    this.score = 0
    this.jumps = 0
    this.jumping = false
    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.createStaticFields()
    this.spriteSetup()
    this.uiSetup()
  }

  createStaticFields() {
    this.scoreIncrement = 10
    this.moveVelocity = 160
    this.jumpVelocity = -330
  }

  spriteSetup() {
    this.sprite.body.setGravityY(300)
    this.sprite.setBounce(0.2)
    this.sprite.setCollideWorldBounds(true)
    this.setAnimations()
  }

  setAnimations() {
    this.game.anims.create({
      key: "left",
      frames: this.game.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.game.anims.create({
      key: "turn",
      frames: [ { key: "dude", frame: 4 } ],
      frameRate: 20
    })

    this.game.anims.create({
      key: "right",
      frames: this.game.anims.generateFrameNumbers("dude", { start: 5, end: 8 } ),
      frameRate: 10,
      repeat: -1
    })
  }

  uiSetup() {
    this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  }

  update() {
    this.setVelocityX()
    this.setVelocityY()
  }

  setVelocityX() {
    let velocityX = 0
    if(this.cursors.left.isDown) velocityX -= this.moveVelocity
    if(this.cursors.right.isDown) velocityX += this.moveVelocity
    this.sprite.setVelocityX(velocityX)
    this.setDirection(velocityX)
  }

  setVelocityY() {
    if(this.sprite.body.touching.down) this.jumps = 0

    if(this.cursors.up.isDown && this.jumps < 2 && !this.jumping) {
      this.jumps++
      this.sprite.body.setVelocityY(this.jumpVelocity)
      this.jumping = true
    }

    if(this.cursors.up.isUp) this.jumping = false
  }

  setDirection(velocityX) {
    if(velocityX > 0) this.sprite.anims.play("right", true)
    else if(velocityX < 0) this.sprite.anims.play("left", true)
    else this.sprite.anims.play("turn")
  }

  collectStar(playerSprite, starSprite) {
    starSprite.disableBody(true, true)
    this.updateScore(this.scoreIncrement)

    if(this.game.stars.group.countActive(true) === 0) {
      this.game.bombs.addBomb()
      this.game.stars.resetStars()
    }
  }

  updateScore(value) {
    this.score += value
    this.scoreText.setText("Score: " + this.score)
  }

  hitByBomb() {
    this.game.physics.pause()
    this.sprite.setTint(0xff0000)
    this.sprite.anims.play("turn")
  }
}