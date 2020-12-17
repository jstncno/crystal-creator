import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { AbstractBaseSketch } from '@crystal-creator/p5/base';
import { Layer } from '@crystal-creator/crystal/layers/base-layer';
import * as utils from '@crystal-creator/p5/utils';
import { BroadcastService } from './broadcast.service';
import { CrystalComponent } from './crystal.component';
import { SupportedLayer } from './layers/utils';


const LAYER_PROBABILITIES = [
  {name: 'centered-shape', prob: 0.15},
  {name: 'circles', prob: 0.17},
  {name: 'lines', prob: 0.15},
  {name: 'dotted-lines', prob: 0.16},
  {name: 'outline-shape', prob: 0.04},
  {name: 'ring-of-shapes', prob: 0.16},
  {name: 'stepped-hexagons', prob: 0.17},
];

const AVAILABLE_LAYERS = LAYER_PROBABILITIES.map(l => l.name);
const LAYER_WEIGHTS = LAYER_PROBABILITIES.map(l => l.prob);


@Component({
  selector: 'cc-crystal-editor',
  templateUrl: './crystal-editor.component.html',
  styleUrls: ['./crystal-editor.component.scss']
})
export class CrystalEditorComponent extends AbstractBaseSketch {

  @ViewChild('sketch')
  root: ElementRef;

  private layers_: SupportedLayer[] = [];
  get layers(): SupportedLayer[] {
    return this.layers_;
  }

  @Input()
  set layers(layers: SupportedLayer[]) {
    this.layers_ = [...layers];
  }

  palette: string[] = [
    '#694873', // English Violet
    '#3374AB', // Spanish Blue
  ];

  constructor(protected readonly broadcast: BroadcastService) {
    super();
  }

  ngOnInit() {
    this.randomize()
  }

  draw = () => {
    // Do nothing here, drawing is delegated
    // to child Crystal component
  };

  randomize() {
    const numLayers = this.floor(this.random(3, 6));
    this.layers = [];
    for (let i = 0; i < numLayers; i++) {
      this.layers.push(this.randomLayerData());
    }
  }

  addLayer() {
    this.layers.push(this.randomLayerData());
    this.redraw();
  }

  randomizeLayer(index: number) {
    if (index < 0 || index >= this.layers_.length) return;
    this.layers_[index] = this.randomLayerData(this.layers_[index].name);
    this.redraw();
  }

  protected randomLayerData(layerType?: string): Layer {
    if (!layerType || !AVAILABLE_LAYERS.includes(layerType)) {
      layerType = utils.chooseOne(this, AVAILABLE_LAYERS, LAYER_WEIGHTS);
    }
    return {
      name: layerType,
      size: CrystalComponent.CRYSTAL_SIZE_PX,
      sides: CrystalComponent.CRYSTAL_SIDES,
      strokeColor: utils.chooseOne(this, this.palette),
      strokeWeight: utils.chooseOne(this, [1, 3]),
      fillColor: utils.chooseOne(this, this.palette),
    };
  }
}