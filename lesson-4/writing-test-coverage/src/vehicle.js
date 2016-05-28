var Vehicle = function(opts) {
  this.make = opts.make;
  this.model = opts.model;
};

Vehicle.prototype = {
  toString: function() {
    return this.make + ' ' + this.model;
  },

  honkHorn:function() {
    return 'Beep beep!';
  }
};
