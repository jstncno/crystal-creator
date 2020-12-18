import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractBaseSketch } from '@crystal-creator/p5/base';
import { Layer } from '@crystal-creator/crystal/layers/base-layer';
import * as utils from '@crystal-creator/p5/utils';
import { CrystalComponent } from './crystal.component';
import { SupportedLayer, createRenderableLayer } from './layers/utils';


const LAYER_PROBABILITIES = [
  {name: 'centered-shape', prob: 0.09},
  {name: 'circles', prob: 0.19},
  {name: 'lines', prob: 0.17},
  {name: 'dotted-lines', prob: 0.16},
  {name: 'outline-shape', prob: 0.04},
  {name: 'ring-of-shapes', prob: 0.18},
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
  set layers(layers: SupportedLayer[]) {
    this.layers_ = layers.map(params => createRenderableLayer(params));
  }

  palette: string[] = [
    '#694873', // English Violet
    '#3374AB', // Spanish Blue
  ];

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router) {
    super();
  }

  ngOnInit() {
    this.randomize();
    this.route.queryParams.subscribe(params => {
      const {layers} = params;
      if (layers) this.layers = JSON.parse(layers);
    });
  }

  draw = () => {
    // Do nothing here, drawing is delegated
    // to child Crystal component
  };

  randomize() {
    const numLayers = this.floor(this.random(3, 6));
    const layers = [];
    for (let i = 0; i < numLayers; i++) {
      const layer = this.randomLayerData();
      layers.push(layer);
    }
    this.layers = [...layers];
  }

  layersChange(layers: SupportedLayer[]) {
    this.layers = [...layers];
  }

  addLayer() {
    this.layers.push(this.randomLayerData());
  }

  randomizeLayer(index: number) {
    if (index < 0 || index >= this.layers.length) return;
    const layers = [...this.layers];
    layers[index] = this.randomLayerData(layers[index].name);
    this.layers = [...layers];
  }

  navBack() {
    this.router.navigate(['/'], {queryParams: {hideInfo: true}});
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
