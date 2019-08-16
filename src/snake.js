import config from "./config.js";
const {width, height, snakeSize, foodSize, initSnakeLength, snakeColor, speed} = config;

export function Snake() {
  this.head = {};
  this.snakeSize = snakeSize;
  this.initSnakeLength = initSnakeLength;
  this.centerX = width >> 1;
  this.centerY = height >> 1;

  this.deg = 270;
}

Snake.prototype.setPlayground = function(pg){
  this.pg = pg;
  this.ctx = this.pg.ctx;
  this.el = this.pg.el;
}

Snake.prototype.setFood = function(food){
  this.food = food;
}

Snake.prototype.init = function() {
  this.initKey();
  this.setXYMove();
  this.initSnake();
}

Snake.prototype.clear = function() {
  this.el.height = this.el.height;
}

Snake.prototype.initKey = function() {
  let that = this;
  document.onkeydown = function(event){
    var e = event || window.event;
    if(e && e.keyCode === 37){ // left
      that.deg += 10;
      that.setXYMove();
    }else if(e && e.keyCode === 39){ // right
      that.deg -= 10;
      that.setXYMove();
    }else if(e && e.keyCode === 85){
      that.body.levelUp();
    }
  };
}

function Body(x, y) {
  this.x = x;
  this.y = y;
  this.length = initSnakeLength;
  this.routeMax = this.length * snakeSize * 3;
  this.route = [];
  for(var i = 0; i < this.routeMax; i++)
    this.route.push([x + i, y]);
}

Body.prototype.setXY = function(x, y){
  this.x = x;
  this.y = y;
  this.route.unshift([x, y]);
  if(this.route.length >= this.routeMax)
    this.route.pop();
}

Body.prototype.draw = function(ctx){
  for(var i = 0; i < this.route.length; i += snakeSize * 3){
    var node = this.route[i];
    ctx.beginPath();
    ctx.fillStyle = snakeColor;
    ctx.arc(node[0], node[1], snakeSize, 0, 2 * Math.PI);
    ctx.fill();
  }
}

Body.prototype.levelUp = function(){
  this.length += 1;
  this.routeMax = this.length * snakeSize * 3;
}

Snake.prototype.initSnake = function() {
  this.body = new Body(this.centerX, this.centerY);
  this.body.draw(this.ctx);
  this.run();
}

Snake.prototype.run = function() {
  var that = this, i, x, y;
  requestAnimationFrame(function() {
    that.clear();
    x = that.body.x;
    y = that.body.y;
    for(i = 1; i <= speed; i++){
      that.body.setXY(x + that.xSpeed * i / speed, y + that.ySpeed * i / speed);
    }
    if(that.isEatFood()){
      that.body.levelUp();
      that.food.refresh();
    }
    that.body.draw(that.ctx);
    that.food.draw(that.ctx);
    that.run();
  });
}

Snake.prototype.isEatFood = function () {
  var body = this.body, food = this.food;
  return (Math.abs(body.x - food.x) < (snakeSize + foodSize)) && (Math.abs(body.y - food.y) < (snakeSize + foodSize));
}

Snake.prototype.setXYMove = function () {
  this.speed = speed;
  this.xSpeed = getSinDeg(this.deg) * this.speed;
  this.ySpeed = getCosDeg(this.deg) * this.speed;
};

function getSinDeg(deg) {
  return Math.sin(deg * Math.PI / 180);
}

function getCosDeg(deg) {
  return Math.cos(deg * Math.PI / 180);
}
