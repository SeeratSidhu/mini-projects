class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0} }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax =  framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = offset
  }

  //print out the player on canvas
  draw() {
    //canvas function
    c.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrame() {
    
  }

  //movement of players left/right(x), up/down(y), adding gravity makes sure the players jumps and comes back
  update() {
    this.draw();
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }

    }
  }
}

//blueprint of our players; input position of the players
class Fighter extends Sprite {
  constructor({ position, velocity, color = "red", offset = {x: 0, y: 0}, imageSrc, scale = 1, framesMax = 1 }) {
    //inherited properties
    super({
      position,
      imageSrc,
      scale, 
      framesMax,
      offset
    });
 
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    //keeping track of the last key pressed, so that the player changes direction on key press
    this.lastKey;
    //weapon properties; follows the players;
    this.attackWeapon = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
  }

  //print out the player on canvas


  //movement of players left/right(x), up/down(y), adding gravity makes sure the players jumps and comes back
  update() {
    this.draw();

    this.attackWeapon.position.x = this.position.x + this.attackWeapon.offset.x;
    this.attackWeapon.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //stop the player from moving and falling off our canvas

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  //track the attack
  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
