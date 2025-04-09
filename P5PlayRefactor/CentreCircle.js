class CentreCirlce {
  constructor() {
    this.centre = new Sprite(0, 0, 50);
    this.centre.colour = "red";
    this.centre.collider = 'static';
  }

  exterminate() {
    this.centre.remove();
  }

  reincarnate() {
    this.centre = new Sprite(0, 0, 50);
    this.centre.collider = 'static';
  }

  hide() {
    this.centre.visible = false;
  }
}