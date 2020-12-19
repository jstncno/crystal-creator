import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as p5 from 'p5';

import { RenderableLayer } from './layers/base-layer';
import { createRenderableLayer, SupportedLayer } from './layers/utils';


@Component({
  selector: 'cc-crystal',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.scss']
})
export class CrystalComponent {

  static readonly CRYSTAL_SIZE_PX: number = 500;
  static readonly CRYSTAL_SIDES = 6;

  private root_: ElementRef;
  get root(): ElementRef {
    return this.root_;
  }
  @ViewChild('sketch')
  set root(el: ElementRef) {
    this.root_ = el;
    this.initSketch();
  }

  private layers_: RenderableLayer[] = [];
  get layers(): RenderableLayer[] {
    return this.layers_;
  }
  @Input()
  set layers(layers: RenderableLayer[]) {
    const needsRedraw = areLayersDifferent(this.layers_, layers);
    this.layers_ = layers.map(params => createRenderableLayer(params));
    if (this.sketch && needsRedraw) this.sketch.redraw();
  }

  @Output()
  layersChange = new EventEmitter<SupportedLayer[]>();

  @Output()
  imageData = new EventEmitter<string>();

  private canvas: HTMLCanvasElement;
  private sketch: p5;

  initSketch() {
    const sketch = s => {
      s.setup = () => this.setup(s);
      s.draw = () => this.draw(s);
    };
    this.sketch = new p5(sketch);
  }

  setup(sketch: p5) {
    const canvas = sketch.createCanvas(CrystalComponent.CRYSTAL_SIZE_PX,
      CrystalComponent.CRYSTAL_SIZE_PX);
    this.canvas = canvas.elt;
    canvas.parent(this.root.nativeElement);
    sketch.noLoop();
    sketch.angleMode(sketch.DEGREES);
    sketch.rectMode(sketch.CENTER);
  }

  draw = (sketch: p5) => {
    this.layers = this.layers.map(layer => {
      layer.render(sketch);
      return layer;
    });
    this.layersChange.emit(this.layers);
    this.imageData.next(this.canvas.toDataURL());
  };
}



function areLayersDifferent(
  oldLayers: SupportedLayer[],
  newLayers: SupportedLayer[]): boolean {
  if (oldLayers.length !== newLayers.length) return true;
  for (const i in oldLayers) {
    const layer = oldLayers[i];
    const newLayer = newLayers[i];
    if (!layer || !newLayer) continue;
    const keys = new Set(Object.keys(layer).concat(Object.keys(newLayer)));
    for (const key of keys) {
      if (typeof layer[key] === 'function' ||
          typeof newLayer[key] === 'function') continue;
      if (layer[key] !== newLayer[key]) return true;
    }
  }
  return false;
}
