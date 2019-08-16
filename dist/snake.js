/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playground_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Snake_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Food_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_js__ = __webpack_require__(2);





var pg = new __WEBPACK_IMPORTED_MODULE_0__playground_js__["a" /* Playground */]();
pg.setWidth(__WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].width);
pg.setHeight(__WEBPACK_IMPORTED_MODULE_3__config_js__["a" /* default */].height);
pg.init();

var food = new __WEBPACK_IMPORTED_MODULE_2__Food_js__["a" /* Food */]();

var sn = new __WEBPACK_IMPORTED_MODULE_1__Snake_js__["a" /* Snake */]();
sn.setPlayground(pg);
sn.setFood(food);
sn.init();

console.log("Main");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Playground;
function Playground() {
  this.width = 1200;
  this.height = 720;
}

Playground.prototype.setWidth = function(value){
  this.width = value;
}

Playground.prototype.setHeight = function(value){
  this.height = value;
}

Playground.prototype.init = function(){
  this.el = document.createElement("canvas");
  let el = this.el;
  el.width = this.width;
  el.height = this.height;
  el.style.border = "1px solid #555";
  el.style.backgroundColor = "#e3e3e3";
  el.style.width = this.width + "px";
  el.style.margin = "20px auto";
  el.style.display = "block";
  document.body.appendChild(el);
  this.ctx = el.getContext("2d");
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  width: 1400, // 画布宽度
  height: 800, // 画布高度
  snakeSize: 12, // 🐍身宽
  initSnakeLength: 5, // 初始化时🐍的长度
  snakeColor: "#ef634c", // 🐍的颜色
  speed: 3, // 🐍的速度
  foodColor: '#efaf7b', // 🍗的颜色
  foodSize: 20 // 🍗的大小
});



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(2);

const {width, height, snakeSize, foodSize, initSnakeLength, snakeColor, speed} = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */];

function Snake() {
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


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Food;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_js__ = __webpack_require__(2);

const {width, height, foodColor, foodSize} = __WEBPACK_IMPORTED_MODULE_0__config_js__["a" /* default */];

function Food(){
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

/***/ })
/******/ ]);