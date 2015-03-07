function Suspend(options) {
  // private variables, only used internally
  this._timer;

  // combine Suspend instance with options
  this.settings = this._merge({
    "every": 500,
    "event": [],
    "element": []
  }, options);

  if (typeof this.settings.event === "string") {
    this.settings.event = [this.settings.event];
  }
  if (typeof this.settings.element === "object" 
      && typeof this.settings.element.length === "undefined") {
        this.settings.element = [this.settings.element];
  }
  return this;
};

Suspend.prototype._merge = function() {
  var obj = {};
  var key;
  for (var i = 0, len = arguments.length; i < len; i++) {
    for (key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
};

Suspend.prototype.data = function(obj) {
  this.settings.data = obj;
  return this;
};

Suspend.prototype.on = function(element, ev) {
  this.settings.element = element;
  if (typeof ev === "string") {
    this.settings.event.push(ev);
  } else {
    this.settings.event.concat(ev);
  }
  return this;
};

Suspend.prototype.callback = function(cb) {
  if (typeof this.settings.callback !== "undefined") {
    return this;
  }
  this.settings.callback = cb;
  return this;
};

Suspend.prototype.element = function(element) {
  this.settings.element = element;
  return this;
};

Suspend.prototype.event = function(ev) {
  this.settings.event = ev;
  return this;
}

Suspend.prototype._events = function() {
  var that = this;
  if (that.settings.event.length == 0) {
    return that;
  }
  for (var j = 0, jlen = that.settings.element.length; j < jlen; j++) {
    var el = that.settings.element[j];
    for (var i = 0, len = that.settings.event.length; i < len; i++) {
      var ev = that.settings.event[i];
      el[ev] = function(e) {
        that.data(e)._start();
      };
    }
  }
  return that;
};

Suspend.prototype.every = function(every) {
  if (typeof every !== "number") {
    throw "Must be integer in miliseconds!";
  }
  this.settings.every = every;
  return this;
};

Suspend.prototype.start = function(every) {
  if (typeof every === "number") {
    this.settings.every = every;
  }
  if (this.settings.event.length == 0) {
    this._start();
    return this;
  }
  this._events();
  return this;
};

Suspend.prototype.trigger = function(every) {
  // alias for Suspend.start
  return this.start(every);
}

Suspend.prototype._start = function() {
  var that = this;
  clearTimeout(that._timer);
  that._timer = setTimeout(function() {
    that.settings.callback(that, that.settings.data);
  }, that.settings.every);
  return that;
};

(function(name, definition) {
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('mod', function() {
  return Suspend;
}));