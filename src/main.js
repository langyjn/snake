import {Playground} from "./playground.js";
import {Snake} from "./Snake.js";
import {Food} from "./Food.js";
import config from "./config.js";

var pg = new Playground();
pg.setWidth(config.width);
pg.setHeight(config.height);
pg.init();

var food = new Food();

var sn = new Snake();
sn.setPlayground(pg);
sn.setFood(food);
sn.init();

console.log("Main");