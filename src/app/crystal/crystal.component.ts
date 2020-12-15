import { Component, ElementRef, ViewChild } from '@angular/core';

import { AbstractBaseSketch } from '@crystal-creator/p5/base';
import { Layer, RenderableLayer } from '@crystal-creator/crystal/layers/base-layer';
import { CenteredShapeLayer, CenteredShape } from '@crystal-creator/crystal/layers/centered-shape/centered-shape';
import { CirclesLayer, Circles } from '@crystal-creator/crystal/layers/circles/circles';
import { DottedLinesLayer, DottedLines, LinesLayer, Lines } from '@crystal-creator/crystal/layers/lines/lines';
import { OutlineShapeLayer, OutlineShape } from '@crystal-creator/crystal/layers/outline-shape/outline-shape';
import { RingOfShapesLayer, RingOfShapes } from '@crystal-creator/crystal/layers/ring-of-shapes/ring-of-shapes';
import { SteppedHexagonsLayer, SteppedHexagons } from '@crystal-creator/crystal/layers/stepped-hexagons/stepped-hexagons';
import * as utils from '@crystal-creator/p5/utils';
import { BroadcastService } from './broadcast.service';

const AVAILABLE_LAYERS = [
  'centered-shape',
  'circles',
  'lines',
  'dotted-lines',
  'outline-shape',
  'ring-of-shapes',
  'stepped-hexagons',
];

type SupportedLayer = Layer
  | CenteredShapeLayer
  | CirclesLayer
  | DottedLinesLayer
  | LinesLayer
  | OutlineShapeLayer
  | RingOfShapesLayer
  | SteppedHexagonsLayer;

@Component({
  selector: 'cc-crystal',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.scss']
})
export class CrystalComponent extends AbstractBaseSketch {

  static readonly CRYSTAL_SIDES = 6;
  static readonly CRYSTAL_SIZE_PX = 500;

  @ViewChild('sketch')
  root: ElementRef;

  private layers_: SupportedLayer[] = [];
  get layers(): SupportedLayer[] {
    return this.layers_;
  }

  set layers(layers: SupportedLayer[]) {
    this.layers_ = [...layers];
    this.redraw();
  }

  palette: string[] = [
    '#694873', // English Violet
    '#3374AB', // Spanish Blue
  ];

  constructor(private readonly broadcast: BroadcastService) {
    super();
  }

  ngOnInit(): void {}

  setup() {
    const sizeWithBuffer = CrystalComponent.CRYSTAL_SIZE_PX * 1.06;
    const canvas = this.createCanvas(sizeWithBuffer, sizeWithBuffer);
    canvas.parent(this.root.nativeElement);
    this.noLoop();
    this.angleMode(this.DEGREES);
    this.rectMode(this.CENTER);
    this.randomize(false /* redraw */);
  }

  draw = () => {
    this.layers_ = this.layers_.map(params => {
      const layer = this.createRenderableLayer(params);
      layer.render(this);
      return layer;
    });
    this.broadcast.onDraw.next();
  };

  redraw() {
    this.clear();
    super.redraw();
  }

  randomize(redraw: boolean = true) {
    const numLayers = this.floor(this.random(3, 6));
    this.layers = [];
    for (let i = 0; i < numLayers; i++) {
      this.layers.push(this.randomLayerData());
    }
    if (redraw) this.redraw();
  }

  addLayer() {
    this.layers.push(this.randomLayerData());
    this.redraw();
  }

  private createRenderableLayer(params: SupportedLayer): RenderableLayer {
    let layer: RenderableLayer;
    switch (params.name) {
      case 'centered-shape':
        layer = new CenteredShape(params);
        break;
      case 'circles':
        layer = new Circles(params);
        break;
      case 'lines':
        layer = new Lines(params);
        break;
      case 'dotted-lines':
        layer = new DottedLines(params);
        break;
      case 'outline-shape':
        layer = new OutlineShape(params as OutlineShapeLayer);
        break;
      case 'ring-of-shapes':
        layer = new RingOfShapes(params);
        break;
      case 'stepped-hexagons':
      default:
        layer = new SteppedHexagons(params);
        break;
    }
    return layer;
  }

  private randomLayerData(layerType?: string): Layer {
    if (!layerType || !AVAILABLE_LAYERS.includes(layerType)) {
      const idx = this.floor(this.random(AVAILABLE_LAYERS.length));
      layerType = AVAILABLE_LAYERS[idx];
    }
    return {
      name: layerType,
      size: 500,
      sides: CrystalComponent.CRYSTAL_SIDES,
      strokeColor: utils.chooseOne(this, this.palette),
      strokeWeight: utils.chooseOne(this, [1, 3]),
      fillColor: utils.chooseOne(this, this.palette),
    };
  }
}
