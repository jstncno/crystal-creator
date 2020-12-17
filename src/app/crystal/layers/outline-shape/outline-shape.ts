import * as p5 from 'p5';

import * as utils from '@crystal-creator/p5/utils';
import * as shapes from '@crystal-creator/p5/shapes';
import {RenderableLayer} from '../base-layer';

export interface OutlineShapeLayer extends RenderableLayer {
  shape: 'hexagon'|'circle';
}

export class OutlineShape implements OutlineShapeLayer {
  name: string = 'outline-shape';
  sides: number = NaN;
  fillColor: string;
  strokeColor: string = 'black';
  strokeWeight: number = 1;
  size: number = 500;

  shape: 'hexagon'|'circle';

  constructor(params?: Partial<OutlineShapeLayer>) {
    this.sides = params?.sides ?? this.sides;
    if (!this.sides) throw `Unexpected value for sides: ${this.sides}`;
    this.fillColor = params?.fillColor ?? null;
    this.strokeColor = params?.strokeColor ?? this.strokeColor;
    this.strokeWeight = params?.strokeWeight ?? this.strokeWeight;
    this.size = params?.size ?? this.size;

    this.shape = params?.shape;
  }

  render = (sketch: p5) => {
    this.setParams(sketch);

    if (this.fillColor) sketch.fill(utils.getColor(sketch, this.fillColor));
    else sketch.noFill();
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
      sketch.translate(this.size / 2, this.size / 2);
      switch(this.shape) {
        case 'hexagon':
          shapes.hexagon(sketch, 0, 0, this.size / 2);
          break;
        case 'circle':
        default:
          sketch.ellipse(0, 0, this.size, this.size);
          break;
      }
    sketch.pop();
  };

  resize = (size: number) => {
    this.size = size;
    return this;
  };

  setParams = (sketch: p5) => {
    this.shape = this.shape ?? utils.chooseOne(sketch, ['hexagon', 'circle']);
    return this;
  };
}