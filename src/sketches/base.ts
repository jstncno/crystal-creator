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
}

export interface Sketch extends AbstractBaseSketch {}

