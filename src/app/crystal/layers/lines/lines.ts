import * as p5 from 'p5';

import * as utils from '@crystal-creator/p5/utils';
import {RenderableLayer} from '../base-layer';

export interface LinesLayer extends RenderableLayer {
  numSteps: number;
  numLines: number;
  start?: number;
  end?: number;
}

export class Lines implements LinesLayer {
  name: string = 'lines';
  sides: number = NaN;
  strokeColor: string = 'black';
  strokeWeight: number = 1;
  size: number = 500;

  numSteps: number = 9;
  numLines: number;
  start?: number;
  end?: number;

  constructor(params?: Partial<LinesLayer>) {
    this.sides = params?.sides ?? this.sides;
    if (!this.sides) throw `Unexpected value for sides: ${this.sides}`;
    this.strokeColor = params?.strokeColor ?? this.strokeColor;
    this.strokeWeight = params?.strokeWeight ?? this.strokeWeight;
    this.size = params?.size ?? this.size;

    this.numSteps = params?.numSteps ?? this.numSteps;
    this.numLines = params?.numLines;
    this.start = params?.start;
    this.end = params?.end;
  }

  render = (sketch: p5) => {
    this.setParams(sketch);
    const angle = 360 / this.numLines;
    const step = (this.size/2) / this.numSteps;

    sketch.noFill();
    sketch.stroke(utils.getColor(sketch, this.strokeColor));
    sketch.strokeWeight(this.strokeWeight);
    sketch.push();
    sketch.translate(this.size / 2, this.size / 2);
      for (let i = 0; i < this.numLines; i++) {
        sketch.line(this.start * step, 0, this.end * step, 0);
        sketch.rotate(angle);
      }
    sketch.pop();
  };

  resize = (size: number) => {
    this.size = size;
    return this;
  };

  setParams = (sketch: p5) => {
    this.numLines = this.numLines ??
      (sketch.floor(sketch.random(this.size / 2)));
    this.start = this.start ?? sketch.floor(sketch.random(0, this.numSteps));
    this.end = this.end ??
      sketch.floor(sketch.random(this.start, this.numSteps+1));
    return this;
  };
}

export interface DottedLinesLayer extends RenderableLayer {
  numLines: number;
  dotSize: number;
  centerOffset: number;
}

export class DottedLines implements DottedLinesLayer {
  name: string = 'dotted-lines';
  sides: number = NaN;
  fillColor: string = 'black';
  size: number = 500;

  numLines: number;
  dotSize: number = 3;
  centerOffset: number;

  constructor(params?: Partial<DottedLinesLayer>) {
    this.sides = params?.sides ?? this.sides;
    if (!this.sides) throw `Unexpected value for sides: ${this.sides}`;
    this.fillColor = params?.fillColor ?? this.fillColor;
    this.size = params?.size ?? this.size;

    this.numLines = params?.numLines;
    this.dotSize = params?.dotSize ?? this.dotSize;
    this.centerOffset = params?.centerOffset ?? this.size / 16;
  }

  render = (sketch: p5) => {
    this.setParams(sketch);
    const angle = 360 / this.numLines;

    sketch.fill(utils.getColor(sketch, this.fillColor));
    sketch.noStroke();
    sketch.push();
      sketch.translate(this.size / 2, this.size / 2);
      for(let i = 0; i <= this.numLines; i++) {
        for(let x = this.centerOffset; x < this.size / 2; x += this.centerOffset) {
          sketch.ellipse(x, 0, this.dotSize, this.dotSize)
        }
        sketch.rotate(angle)
      }
    sketch.pop();
  };

  resize = (size: number) => {
    this.size = size;
    return this;
  };

  setParams = (sketch: p5) => {
    this.numLines = this.numLines ||
      utils.coinFlip(sketch) ? this.sides : this.sides * 2;
    return this;
  };
}
