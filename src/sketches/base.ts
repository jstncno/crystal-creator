import { Directive } from '@angular/core';
import * as p5 from 'p5';

// @Directive()
export class AbstractBaseSketch extends p5 {
  constructor(node?: HTMLElement) {
    super(_ => {}, node);
  }

  draw = (): void => {
    throw '.draw() is an abstract class';
  }

  redraw() {
    try {
      this.clear();
      super.redraw();
    } catch {}
  }
}

export interface Sketch extends AbstractBaseSketch {}

