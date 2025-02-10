class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h`);
  }

  go() {
    if (this.speed < 200 && !this.isTrunkOpen) {
      this.speed += 5;
    }
  }

  break() {
    if (this.speed > 0) {
      this.speed -= 5
    }
  }

  openTrunk() {
    this.isTrunkOpen = true;
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
};

class RaceCar extends Car{
  accelerate;
  constructor(brand, model, accelerate) {
    super(brand, model);
    this.accelerate = accelerate;
  }

  go() {
    if (this.speed < 300 && !this.isTrunkOpen) {
      this.speed += this.accelerate;
    }
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');
const car3 = new RaceCar('McLaren', 'F1', 10);

car2.go();

car1.displayInfo()
car2.displayInfo()
car3.displayInfo()