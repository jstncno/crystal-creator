import { Component } from '@angular/core';
import { CrystalComponent } from '@crystal-creator/crystal/crystal.component';

import { Layer } from '@crystal-creator/crystal/layers/base-layer';


@Component({
  selector: 'cc-crystal-sheet',
  templateUrl: './crystal-sheet.component.html',
  styleUrls: ['./crystal-sheet.component.scss']
})
export class CrystalSheetComponent extends CrystalComponent {

  static readonly CANVAS_HEIGHT_PX = window.innerHeight
  static readonly CANVAS_WIDTH_PX = window.innerWidth;
  static readonly GUTTER_PX = 5;

  static readonly NUM_CRYSTALS_WIDTH = 10;
  static readonly CRYSTAL_SIZE_PX = (CrystalSheetComponent.CANVAS_WIDTH_PX /
    CrystalSheetComponent.NUM_CRYSTALS_WIDTH) - (CrystalSheetComponent.GUTTER_PX);

  setup() {
    const width = CrystalSheetComponent.CANVAS_WIDTH_PX +
      CrystalSheetComponent.GUTTER_PX;
    const height = CrystalSheetComponent.CANVAS_HEIGHT_PX +
      CrystalSheetComponent.GUTTER_PX;
    const canvas = this.createCanvas(width, height);
    canvas.parent(this.root.nativeElement);
    this.noLoop();
    this.angleMode(this.DEGREES);
    this.rectMode(this.CENTER);
    this.randomize(false /* redraw */);
  }

  draw = () => {
    for (let row = 0; (row*CrystalSheetComponent.CRYSTAL_SIZE_PX) < CrystalSheetComponent.CANVAS_WIDTH_PX-CrystalSheetComponent.CRYSTAL_SIZE_PX; row++) {
      let x = (row*(CrystalSheetComponent.CRYSTAL_SIZE_PX+CrystalSheetComponent.GUTTER_PX));
      for (let col = 0; (col*CrystalSheetComponent.CRYSTAL_SIZE_PX) < CrystalSheetComponent.CANVAS_HEIGHT_PX+CrystalSheetComponent.CRYSTAL_SIZE_PX; col++) {
        this.push();
        let y = (col*(CrystalSheetComponent.CRYSTAL_SIZE_PX+CrystalSheetComponent.GUTTER_PX));
        this.translate(x, y);
        if (row % 2 === 0) this.translate(0, -(CrystalSheetComponent.CRYSTAL_SIZE_PX / 2));
        this.translate(CrystalSheetComponent.GUTTER_PX, CrystalSheetComponent.GUTTER_PX);
        const numLayers = this.floor(this.random(2, 5));
        for (let i = 0; i < numLayers; i++) {
          const params = this.randomLayerData();
          const layer = this.createRenderableLayer(params);
          layer.render(this);
        }
        this.pop();
      }
    }
  };

  protected randomLayerData(layerType?: string): Layer {
    const params = super.randomLayerData(layerType);
    return {
      ...params,
      size: CrystalSheetComponent.CRYSTAL_SIZE_PX,
    };
  }
}
