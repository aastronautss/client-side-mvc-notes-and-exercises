var Honda = function(model) {
  this.make = "Honda"
  this.model = model;
  this.price = Honda.getPrice(this.model);

  if (!this.verify()) {
    throw new Error("Model " + this.model + " does not exist.");
    return undefined;
  }
};

Honda.prototype = Object.create(Vehicle.prototype);

Honda.models = ["Accord", "Civic", "Crosstour", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Pilot"];
Honda.prices = [16500,    14500,   21000,       15800,  12000,  13100, 16000,  18100,     22500,     19300]

Honda.prototype.verify = function() {
  return Honda.models.includes(this.model);
};

Honda.getPrice = function(model) {
  var idx = Honda.models.indexOf(model);
  return Honda.prices[idx];
}

Honda.getModels = function() {
  return Honda.models.slice();
}

Honda.constructor = Honda;
