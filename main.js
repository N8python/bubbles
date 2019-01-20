window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  var mouseX = 0;
  var mouseY = 0;

  function randInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  function drawEllipse(x, y, width, height) {
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
    ctx.fill();
  }


  function getRandomColor() {
    var characters = "0123456789ABCDEF";
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += characters[randInt(0, 15)];
    }

    return color;
  }
  class Ball {
    constructor(x, y, rad, hue) {
      this.x = x;
      this.y = y;
      this.rad = rad;
      this.hue = hue;
      this.xVel = randInt(-5, 6);
      this.yVel = randInt(-5, 6);
    }
    draw() {
      ctx.fillStyle = this.hue;
      drawEllipse(this.x, this.y, this.rad * 2, this.rad * 2)
    }
    move() {
      this.x += this.xVel;
      this.y += this.yVel;
      this.x+=(mouseX-this.x)/100;
      this.y+=(mouseY-this.y)/100;
      if (this.x < this.rad || this.x > canvas.width - this.rad) {
        this.xVel *= -1;
        this.x += this.xVel;
      }
      if (this.y < this.rad || this.y > canvas.height - this.rad) {
        this.yVel *= -1;
        this.y += this.yVel;
      }
    }
  }
  var balls = [];
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball(randInt(50, canvas.width - 50), randInt(50, canvas.height - 50), randInt(1, 7),
    getRandomColor()));
  }
  var intervalId = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
      ball.draw();
      ball.move()
    });
  }, 30)
  document.addEventListener("mousemove", event => {
    mouseX = event.x-10;
    mouseY = event.y-80;
  })
}
