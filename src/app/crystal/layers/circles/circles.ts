import * as p5 from 'p5';

import * as utils from '@crystal-creator/p5/utils';
import {RenderableLayer} from '../base-layer';

export interface CirclesLayer extends RenderableLayer {
  diameter: number;
  position: number;
}

export class Circles implements CirclesLayer {
  name: string = 'circles';
  sides: number = NaN;
  strokeColor: string = 'black';
  strokeWeight: number = 1;
  size: number = 500;
  diameter: number;
  position: number;

  constructor(params?: Partial<CirclesLayer>) {
    this.sides = params?.sides ?? this.sides;
    if (!this.sides) throw `Unexpected value for sides: ${this.sides}`;
    this.strokeColor = params?.strokeColor ?? this.strokeColor;
    this.strokeWeight = params?.strokeWeight ?? this.strokeWeight;
    this.size = params?.size ?? this.size;

    this.diameter = params?.diameter;
    this.position = params?.position;
  }

  render = (sketch: p5) => {
    this.setParams(sketch);
    const angle = 360 / this.sides;

    sketch.noFill();
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
      sketch.translate(this.size / 2, this.size / 2);
      for (let i = 0; i < this.sides; i++) {
        sketch.ellipse(this.position, 0, this.diameter, this.diameter);
        sketch.rotate(angle);
      }
    sketch.pop();
  };

  resize = (size: number) => {
    const halfSize = size / 2;

    const diameter = (this.diameter * size) / this.size;

    let position = this.position;
    switch (this.position){
      case ((this.size/2)-(this.diameter/2)):
        position = halfSize - (diameter/2);
        break;
      case ((this.size/2)-this.diameter):
        position = halfSize - diameter;
        break;
      case this.diameter:
      default:
        position = diameter;
        break;
    }

    this.diameter = diameter;
    this.position = position;
    this.strokeWeight = (this.strokeWeight * size) / this.size;
    this.size = size;
    return this;
  };

  setParams = (sketch: p5) => {
    const halfSize = this.size / 2;
    const sixteenth = this.size / 16;
    this.diameter = this.diameter ?? sketch.random(sixteenth, halfSize * 0.9);
    this.position = this.position ?? utils.chooseOne(sketch,
      [this.diameter, halfSize-this.diameter, halfSize-(this.diameter/2)]);
    return this;
  };
}