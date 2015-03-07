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