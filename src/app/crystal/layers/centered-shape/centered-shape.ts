import * as p5 from 'p5';

import * as utils from '@crystal-creator/p5/utils';
import * as shapes from '@crystal-creator/p5/shapes';
import { Layer, RenderableLayer } from '../base-layer';

export interface CenteredShapeLayer extends Layer {
  shape: 'hexagon'|'circle'|'rect'|'triangle';
  shapeSize: number;
  stepsOut: number;
  rotation?: number;
}

export class CenteredShape implements CenteredShapeLayer, RenderableLayer {
  name: string = 'centered-shape';
  sides: number = NaN;
  fillColor: string = 'black';
  strokeColor: string = 'black';
  strokeWeight: number = 1;
  size: number = 500;

  shape: 'hexagon' | 'circle'|'rect'|'triangle';
  shapeSize: number;
  stepsOut: number = 9;
  rotation: number = 0;

  constructor(params?: Partial<CenteredShapeLayer>) {
    this.sides = params?.sides ?? this.sides;
    if (!this.sides)
      throw `Unexpected value for sides: ${this.sides}`;
    this.fillColor = params?.strokeColor ?? this.fillColor;
    this.strokeColor = params?.strokeColor ?? this.strokeColor;
    this.strokeWeight = params?.strokeWeight ?? this.strokeWeight;
    this.size = params?.size ?? this.size;

    this.shape = params?.shape;
    this.shapeSize = params?.shapeSize;
    this.stepsOut = params?.stepsOut ?? this.stepsOut;
    this.rotation = params?.rotation ?? this.rotation;
  }

  render = (sketch: p5) => {
    this.shape = this.shape ?? utils.chooseOne(sketch,
      ['hexagon', 'circle', 'rect', 'triangle']);
    const step = (this.size / 2) / this.stepsOut;
    this.shapeSize = this.shapeSize ?? sketch.floor(sketch.random(
        this.stepsOut / 2, this.stepsOut)) * step;

    sketch.fill(utils.getColor(sketch, this.fillColor));
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
      sketch.translate(sketch.width / 2, sketch.height / 2);
      if (this.rotation) sketch.rotate(this.rotation);
      switch (this.shape) {
        case 'hexagon':
          shapes.hexagon(sketch, 0, 0, this.shapeSize);
          break;
        case 'circle':
          sketch.ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2);
          break;
        case 'rect':
          sketch.rect(0, 0, this.shapeSize * 2, this.shapeSize * 2);
          break;
        case 'triangle':
        default:
          shapes.polygon(sketch, 3, 0, 0, this.shapeSize);
          break;
      }
    sketch.pop();
  };
}

