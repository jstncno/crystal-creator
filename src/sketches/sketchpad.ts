import {AbstractBaseSketch} from './base';

export class Sketchpad extends AbstractBaseSketch {
  c = [];
  strokeColor = 0;

  setup() {
    let canvas2 = this.createCanvas(this.windowWidth - 500, this.windowHeight - 200);
    // creating a reference to the div here positions it so you can put things above and below
    // where the sketch is displayed
    // canvas2.parent('sketch-holder');

    this.background(255);
    this.strokeWeight(2);

    this.c[0] = this.color(148, 0, 211);
    this.c[1] = this.color(75, 0, 130);
    this.c[2] = this.color(0, 0, 255);
    this.c[3] = this.color(0, 255, 0);
    this.c[4] = this.color(255, 255, 0);
    this.c[5] = this.color(255, 127, 0);
    this.c[6] = this.color(255, 0, 0);

    this.rect(0, 0, this.width, this.height);

    this.stroke(this.c[this.strokeColor]);
  }

  draw = () => {
    if (this.mouseIsPressed) {
      if (this.mouseButton === this.LEFT) {
        this.line(this.mouseX, this.mouseY, this.pmouseX, this.pmouseY);
      } else if (this.mouseButton === this.CENTER) {
        this.background(255);
      }
    }
  };

  mouseReleased() {
    // modulo math forces the color to swap through the array provided
    this.strokeColor = (this.strokeColor + 1) % this.c.length;
    this.stroke(this.c[this.strokeColor]);
    console.log(`color is now ${this.c[this.strokeColor]}`);
  }
}