class fuel {
  constructor(tankVol) { 
    this.tankVol = tankVol;
    this.remainingFuel = tankVol;
    this.slider = createSlider(0, this.tankVol, this.tankVol); //min, max, default value, step
    this.slider.mousePressed(false);
    this.slider.style('pointer-events', 'none');
    this.slider.position(10, 10);
    this.sliderSize = this.tankVol / 5;
    this.slider.size(this.sliderSize);
  }

  fuelMain() {

    this.idleConsumtion();

    if (this.remainingFuel < 0) {
      this.remainingFuel = 0;
    }

    this.slider.value(this.remainingFuel);
    text(`Fuel: ${round(this.remainingFuel)} / ${this.tankVol}`, (this.sliderSize) + 20, 23);
  }

  idleConsumtion() {
    if (this.remainingFuel > 0) {
      this.remainingFuel -= 0.01;
    }
  }

  throttleConsumtion(force) {
    if (this.remainingFuel > 0) {
      this.remainingFuel -= force / 2;
    }
  }

  //this function is a subject to change, depending on 
  // how exaclty refuelling is going to be implemented. 
  // For the sake of development, let's refuel with the R key for now
  refueling() { 
    this.remainingFuel = this.tankVol;
  }

}

function keyReleased() { //this function is written with the assumtion that there is going to be only
//  1 instance of a Player class object that will have only 1 instance of fuel class object
  if (key === 'r') {
    player.fuelBar.refueling();
  }
}