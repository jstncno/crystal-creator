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
    const halfSize = this.size / 2;
    const eighth = this.size / 8;
    const sixteenth = this.size / 16;
    this.diameter = this.diameter ?? sketch.random(sixteenth, halfSize * 0.9);
    this.position = this.position ?? utils.chooseOne(sketch,
      [this.diameter, halfSize-this.diameter, halfSize-(this.diameter/2)]);
    const angle = 360 / this.sides;

    sketch.noFill();
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
      sketch.translate(sketch.width/2, sketch.height/2);
      for (let i = 0; i < this.sides; i++) {
        sketch.ellipse(this.position, 0, this.diameter, this.diameter);
        sketch.rotate(angle);
      }
    sketch.pop();
  };
}