import * as p5 from 'p5';

import * as utils from '@crystal-creator/p5/utils';
import * as shapes from '@crystal-creator/p5/shapes';
import {RenderableLayer} from '../base-layer';

export interface SteppedHexagonsLayer extends RenderableLayer {
  steps: number;
  minSteps?: number;
  maxSteps?: number;
  rotation: number;
  centerOffset: number;
}

export class SteppedHexagons implements SteppedHexagonsLayer {
  name: string = 'stepped-hexagons';
  sides: number = NaN;
  strokeColor: string = 'black';
  strokeWeight: number = 1;
  size: number = 500;

  steps: number;
  minSteps: number = 3;
  maxSteps: number = 9;
  centerOffset: number;
  rotation: number;

  constructor(params?: Partial<SteppedHexagonsLayer>) {
    this.sides = params?.sides ?? this.sides;
    this.strokeColor = params?.strokeColor ?? this.strokeColor;
    this.strokeWeight = params?.strokeWeight ?? this.strokeWeight;
    this.size = params?.size ?? this.size;

    this.steps = params?.steps;
    this.minSteps = params?.minSteps ?? this.minSteps;
    this.maxSteps = params?.maxSteps ?? this.maxSteps;
    this.centerOffset = params?.centerOffset ?? (this.size / 2) * 0.15;
    this.rotation = params?.rotation;
  }

  render = (sketch: p5) => {
    this.steps = this.steps ??
      (sketch.floor(sketch.random(this.minSteps, this.maxSteps)));
    const stepSize = ((this.size / 2) - this.centerOffset) / this.steps;

    sketch.noFill();
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
    sketch.translate(sketch.width/2, sketch.height/2);
      if (this.rotation) sketch.rotate(this.rotation)
      for (let i = 1; i <= this.steps; i++) {
        const r = sketch.floor(i * stepSize);
        shapes.hexagon(sketch, 0, 0, r);
      }
    sketch.pop();
  };
}