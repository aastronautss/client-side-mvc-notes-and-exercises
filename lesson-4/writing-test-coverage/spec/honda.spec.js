describe("Honda constructor", function() {
  it("inherits the Vehicle prototype", function() {
    var my_honda = new Honda("Accord");
    expect(my_honda.toString()).toBe("Honda Accord");
  });

  it("sets the model property when a valid model is passed in", function() {
    var my_accord = new Honda("Accord");
    expect(my_accord.make).toBe("Honda");
    expect(my_accord.model).toBe("Accord");
  });

  it("throws an error if an invalid model is passed in", function() {
    var throwError = function() {
      var my_prius = new Honda("Prius");
    }
    expect(throwError).toThrowError("Model Prius does not exist.");
  });

  it("returns a list of valid models", function() {
    expect(Honda.models).toBeDefined();
    expect(Honda.models).toContain("Accord");
  });

  it("calls getPrice when a new car is created", function() {
    spyOn(Honda, 'getPrice');

    var my_civic = new Honda('Civic');

    expect(Honda.getPrice).toHaveBeenCalled();
  });

  it("returns a price for the passed in model", function() {
    expect(Honda.getPrice("Crosstour")).toBeGreaterThan(0);
  });

  it("returns a price less than 15000 when a Civic is created", function() {
    var my_other_civic = new Honda("Civic");

    expect(my_other_civic.price).toBeLessThan(15000);
  });

  it("returns a price greater than 10000 when a CR-Z is created", function() {
    var my_crz = new Honda('CR-Z');

    expect(my_crz.price).toBeGreaterThan(10000);
  });
});
