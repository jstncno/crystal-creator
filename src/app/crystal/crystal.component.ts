import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { AbstractBaseSketch } from '@crystal-creator/p5/base';
import { RenderableLayer } from '@crystal-creator/crystal/layers/base-layer';

import { BroadcastService } from './broadcast.service';
import { createRenderableLayer } from './layers/utils';


@Component({
  selector: 'cc-crystal',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.scss']
})
export class CrystalComponent extends AbstractBaseSketch {

  static readonly CRYSTAL_SIZE_PX: number = 500;
  static readonly CRYSTAL_SIDES = 6;

  @ViewChild('sketch')
  root: ElementRef;

  private layers_: RenderableLayer[] = [];
  get layers(): RenderableLayer[] {
    return this.layers_;
  }

  @Input()
  set layers(layers: RenderableLayer[]) {
    this.layers_ = [...layers];
    this.redraw();
  }

  constructor(protected readonly broadcast: BroadcastService) {
    super();
  }

  setup() {
    const sizeWithBuffer = CrystalComponent.CRYSTAL_SIZE_PX * 1.06;
    const canvas = this.createCanvas(sizeWithBuffer, sizeWithBuffer);
    if (this.root) canvas.parent(this.root.nativeElement);
    this.noLoop();
    this.angleMode(this.DEGREES);
    this.rectMode(this.CENTER);
  }

  draw = () => {
    this.layers.map(params => createRenderableLayer(params))
      .forEach(layer => layer.render(this));
    this.broadcast.onDraw.next();
  };

  redraw() {
    try {
      this.clear();
      super.redraw();
    } catch {}
  }
}
