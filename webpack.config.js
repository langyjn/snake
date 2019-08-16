'use strict';

const path = require('path');

function resolve(name){
  return path.resolve(__dirname, name);
}

module.exports = {
  entry: resolve("src/main.js"),
  output: {
    filename: "snake.js",
    path: resolve("dist")
  }
}