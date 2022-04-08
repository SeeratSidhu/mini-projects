class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  //print out the player on canvas
  draw() {
    //canvas function
    c.drawImage(this.image, this.position.x, this.position.y)
  }

  //movement of players left/right(x), up/down(y), adding gravity makes sure the players jumps and comes back
  update() {
    this.draw();
  }
}


//blueprint of our players; input position of the players
class Fighter {
  constructor({ position, velocity, color = "red", offset }) {
    this.position = position;
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
  }

  //print out the player on canvas
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //weapon
    if (this.isAttacking) {
      c.fillStyle = "yellow";
      c.fillRect(
        this.attackWeapon.position.x,
        this.attackWeapon.position.y,
        this.attackWeapon.width,
        this.attackWeapon.height
      );
    }
  }

  //movement of players left/right(x), up/down(y), adding gravity makes sure the players jumps and comes back
  update() {
    this.draw();

    this.attackWeapon.position.x = this.position.x + this.attackWeapon.offset.x;
    this.attackWeapon.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //stop the player from moving and falling off our canvas

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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