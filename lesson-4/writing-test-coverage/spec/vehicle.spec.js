describe("A Vehicle", function() {
  beforeEach(function() {
    this.my_car = new Vehicle({ make: "Honda", model: "Accord" });
  });

  it("has a make and a model", function() {
    expect(this.my_car.make).toBeDefined();
    expect(this.my_car.model).toBeDefined();
  });

  it("displays a nice string", function() {
    expect(this.my_car.toString()).toBe("Honda Accord");
  });

  it("honks", function() {
    expect(this.my_car.honkHorn()).toBe("Beep beep!");
  });
});
