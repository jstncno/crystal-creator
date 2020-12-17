import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AbstractBaseSketch } from '@crystal-creator/p5/base';

import { RenderableLayer } from './layers/base-layer';
import { createRenderableLayer, SupportedLayer } from './layers/utils';


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
    const redraw = needsRedraw(this.layers_, layers);
    this.layers_ = layers.map(params => createRenderableLayer(params));
    if (redraw) this.redraw();
  }

  @Output()
  layersChange = new EventEmitter<SupportedLayer[]>();

  constructor() {
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
    this.layers = this.layers.map(layer => {
      layer.render(this);
      return layer;
    });
    this.layersChange.emit(this.layers);
  };
}


function needsRedraw(
  oldLayers: SupportedLayer[],
  newLayers: SupportedLayer[]): boolean {
  if (oldLayers.length !== newLayers.length) return true;
  let redraw = false;
  for (const i in oldLayers) {
    const layer = oldLayers[i];
    const newLayer = newLayers[i];
    if (!layer || !newLayer) continue;
    const keys = new Set(Object.keys(layer).concat(Object.keys(newLayer)));
    for (const key of keys) {
      if (key === 'render') continue;
      if (layer[key] !== newLayer[key]) redraw = true;
    }
  }
  return redraw;
}
