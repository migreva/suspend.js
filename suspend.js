function Suspend(options) {
  // timer variable for instance
  this._timer;

  // combine Suspend instance with options
  this.opts = this._merge({
    every: 500,
    event: [],
    element: [],
    callback: null
  }, options);

  if (typeof this.opts.event === "string") {
    this.opts.event = [this.opts.event];
  }
  if (typeof this.opts.element === "object" 
      && typeof this.opts.element.length === "undefined") {
        this.opts.element = [this.opts.element];
  }

  return this;
};

Suspend.prototype._merge = function(defaults, options) {
  for (key in options) {
    if (defaults.hasOwnProperty(key)) {
      defaults[key] = options[key];
    }
  }
  return defaults;
};

Suspend.prototype.data = function(obj) {
  this.opts.data = obj;
  return this;
};

Suspend.prototype.on = function(element, ev) {
  this.opts.element = element;
  if (typeof ev === "string") {
    this.opts.event.push(ev);
  } else {
    this.opts.event.concat(ev);
  }
  return this;
};

Suspend.prototype.callback = function(cb) {
  if (this.opts.callback !== null) {
    return this;
  }
  this.opts.callback = cb;
  return this;
};

Suspend.prototype.element = function(element) {
  this.opts.element = element;
  return this;
};

Suspend.prototype.event = function(ev) {
  this.opts.event = ev;
  return this;
}

Suspend.prototype._events = function() {
  var that = this;
  if (that.opts.event.length == 0) {
    return that;
  }
  for (var j = 0, jlen = that.opts.element.length; j < jlen; j++) {
    var el = that.opts.element[j];
    for (var i = 0, len = that.opts.event.length; i < len; i++) {
      var ev = that.opts.event[i];
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
  this.opts.every = every;
  return this;
};

Suspend.prototype.start = function(every) {
  if (typeof every === "number") {
    this.opts.every = every;
  }
  if (this.opts.event.length == 0) {
    this._start();
    return this;
  }
  this._events();
  return this;
};

Suspend.prototype.trigger = function(every) {
  return this.start(every);
}

Suspend.prototype._start = function() {
  var that = this;
  clearTimeout(that._timer);
  that._timer = setTimeout(function() {
    that.opts.callback(that, that.opts.data);
  }, that.opts.every);
  return that;
};

(function(name, definition) {
  if (typeof module != 'undefined') module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('Suspend', function() {
  return Suspend;
}));