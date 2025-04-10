class CentreCirlce {
  constructor() {
    this.centre = new Sprite(0, 0, 50);
    this.centre.colour = "red";
    this.centre.collider = 'static';
  }

  remove() {
    this.centre.remove();
  }
}