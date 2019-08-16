export function Playground() {
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

