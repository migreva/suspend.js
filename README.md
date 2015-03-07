Suspender
=========

A simple wait-to-trigger library that will suspend a function from being activated
while an event gets continuously triggered.

Dependencies
------------

* There are none

Install
-------

```
bower install suspend.js
```

Tutorial
--------

Prevent a function to be actived when keys keep getting pressed

```
var search_wait = new Suspend(function() {
  console.log("If a key is pressed more than once every 500ms then I won't activate!");
});

document
  .getElementById("search-input")
  .onkeypress = function(e) {
    search_wait.every(500);
  };
```

Or figure out what to do when the window is resized

```
var responsive_wait = new Suspend();
window.onresize = function(event) {
  responsive_wait
    .callback(function() {
      console.log("If window is resized more than once every 1000ms then I won't activate!");
    })
    .every(1000);
};
```

API
---

Suspend(callback, data)
-----------------------

* callback function -- function to be activated when the timer expires
* data -- object that will be passed to the callback function

.callback(cb)
-------------

* cb -- function to be activated when the timer expires

.data(dt)
---------

* dt -- data object that will be passed to the callback function

.every(timer)
-------------

* timer -- integer in miliseconds that determines how long to wait for the event
to be triggered before activating the callback function

Credits
-------

* Eric Bower <neurosnap@gmail.com>