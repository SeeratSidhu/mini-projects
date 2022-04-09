const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

//blueprint of our players; input position of the players
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})
const shop = new Sprite({
  position: {
    x: 600,
    y: 160
  },
  imageSrc: './img/shop.png',
  scale: 2.5,
  framesMax: 6
})

const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: './img/samuraiMack/Idle.png',
  scale: 2.5,
  framesMax: 8,
  offset: {
    x: 215,
    y: 155
  }
});

const enemy = new Fighter({
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



decreaseTimer();





function animate() {
  // put in the function you want to call again and again
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";

  //clearing the old position to avoid the paint like effect
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
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
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  if (
    rectangleCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({player, enemy, timerId})
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
