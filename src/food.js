import config from "./config.js";
const {width, height, foodColor, foodSize} = config;

export function Food(){
  this.refresh();
}

Food.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = foodColor;
  ctx.fillRect(this.x - foodSize, this.y - foodSize, foodSize, foodSize);
}

Food.prototype.refresh = function() {
  var pos = randomPosition();
  this.x = pos.x;
  this.y = pos.y;
}

function randomPosition() {
  return {
    x: 50 + parseInt(Math.random() * (width - 100)),
    y: 50 + parseInt(Math.random() * (height - 100)),
  };
}