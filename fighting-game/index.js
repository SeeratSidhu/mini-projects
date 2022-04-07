const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//blueprint of our players; input position of the players
class Sprite {
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

const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
});

const enemy = new Sprite({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: "blue",
  offset: { x: -50, y: 0 },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

function rectangleCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackWeapon.position.x + rectangle1.attackWeapon.width >=
      rectangle2.position.x && rectangle1.attackWeapon.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackWeapon.position.y + rectangle1.attackWeapon.height >=
      rectangle2.position.y &&
    rectangle1.attackWeapon.position.y <=
      rectangle2.position.y + rectangle2.height
  );
}

function animate() {
  // put in the function you want to call again and again
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";

  //clearing the old position to avoid the paint like effect
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //moving player left and right on keydown; so even if multiple keys are pressed at the same time, it moves
  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  }

  if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  }

  if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //detect collision
  if (
    rectangleCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("ATTACKSSSS");
  }
  if (
    rectangleCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("ENEMY ATTACKSSSS");
  }
}

//activate the animation loop

animate();

//Event Listeners; Control keys

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;

    case "w":
      player.velocity.y = -20;
      break;

    case " ":
      player.attack();
      break;

    //enemy moves
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;

    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  //enemy moves
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
