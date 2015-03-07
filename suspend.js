function Suspend(callback, data) {
  this.timer;
  this._data = data;
  this._callback = callback;
  return this;
};

Suspend.prototype.data = function(obj) {
  if (typeof this._data != "undefined") {
    return this;
  }
  this._data = obj;
  return this;
};

Suspend.prototype.callback = function(cb) {
  if (typeof this._callback != "undefined") {
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
