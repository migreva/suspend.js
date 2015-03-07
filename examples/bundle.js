(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Suspend = require("../suspend.js");
/*
 * Setup
 */
var explain = function(timer) {
  return "more than once every " + timer + "ms then I wouldn't have activated!";
};
var timer1 = 500;
var timer2 = 1000;
var timer3 = 200;

/*
 * Delay function until keys stop being pressed
 */
var search_wait = new Suspend(function() {
  console.log("If key was pressed " + explain(timer1));
});

document
  .getElementById("search-input")
  .onkeypress = function(e) {
    search_wait.every(timer1);
  };

/*
 * Delay function until window stops being resized
 */
var responsive_wait = new Suspend();
window.onresize = function(event) {
  responsive_wait
    .callback(function() {
      console.log("If window was resized " + explain(timer2));
    })
    .every(timer2);
};

/*
 * Delay function until button stops being pressed
 */
var ewait = new Suspend(function(e) {
  console.log(e);
  console.log("If button was clicked " + timer3);
});
document
  .getElementById("search-button")
  .onclick = function(e) {
    ewait.data(e).every(timer3);
  };
},{"../suspend.js":2}],2:[function(require,module,exports){
function Suspend(callback, data) {
  this.timer;
  this._data = data;
  this._callback = callback;
  return this;
};

Suspend.prototype.data = function(obj) {
  if (typeof this._data !== "undefined") {
    return this;
  }
  this._data = obj;
  return this;
};

Suspend.prototype.callback = function(cb) {
  if (typeof this._callback !== "undefined") {
    return this;
  }
  this._callback = cb;
  return this;
};

Suspend.prototype.every = function(duration) {
  var that = this;
  clearTimeout(that.timer);
  that.timer = setTimeout(function() {
    that._callback(that._data);
  }, duration);
  return that;
};

(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('mod', function() {
    //Here goes the code you would normally have inside define() or add to module.exports
    return Suspend;
}));
},{}]},{},[1]);
