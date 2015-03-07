var Suspend = require("../suspend.js");
/*
 * Setup
 */
var explain = function(timer) {
  return "more than once every " + timer + "ms then I wouldn't have activated!";
};
var timer1 = 500;
var timer2 = 1000;
var timer3 = 1000;

/*
 * Delay function until keys stop being pressed
 */
var search_wait = new Suspend();
search_wait.callback(function() {
  console.log("If key was pressed " + explain(timer1));
});

document
  .getElementById("search-input")
  .onkeypress = function() {
    search_wait.every(timer1).start();
  };

/*
 * Delay function until window stops being resized
 */
var responsive_wait = new Suspend();
window.onresize = function() {
  responsive_wait
    .callback(function() {
      console.log("If window was resized " + explain(timer2));
    })
    .every(timer2)
    .start();
};

/*
 * Delay function until input box stops being focused or blurred
 */
var ewait = new Suspend({
  every: timer3,
  callback: function(context, e) {
    console.log(e);
    console.log("If search box was focused or blurred " + explain(timer3));
  }
});

var search_input = document.getElementById("search-input");
search_input
  .onfocus = function(e) {
    ewait.data(e).trigger();
  };
search_input
  .onblur = function(e) {
    ewait.data(e).trigger();
  };

/*
 * Delay function until search button stops being clicked
 */
var search_submit = new Suspend();
search_submit
  .every(1000)
  .on(document.getElementById("search-button"), "onclick")
  .callback(function(context, e) {
    console.log(context);
    console.log(e);
    console.log("If button was clicked " + explain(1000));
  })
  .start();

/*
 * Delay function until mouse is not longer hovering
 */
var hover_wait = new Suspend({
  element: [
    document.getElementById("box-one"),
    document.getElementById("box-two")
  ],
  event: "onmouseover",
  every: 1000,
  callback: function(context, e) {
    console.log(e);
    console.log("If either box was hovered " + explain(1000));
  }
}).start();