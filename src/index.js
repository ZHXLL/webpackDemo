
// import $ from "expose-loader?$!jquery";
// import $ from "jquery";
// console.log(window.$);
// console.log($);
import logo from "./123.jpg";
let img = new Image();
img.src = logo;
document.body.appendChild(img);
require('./index.css');
require("./a.less");
// let str = require("./a.js");
// require("@babel/polyfill");
// console.log(str);
class Admin {

}