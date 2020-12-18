import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CrystalComponent } from '@crystal-creator/crystal/crystal.component';
import { CrystalEditorComponent } from '@crystal-creator/crystal/crystal-editor.component';

import { Layer, RenderableLayer } from '@crystal-creator/crystal/layers/base-layer';
import { createRenderableLayer } from '@crystal-creator/crystal/layers/utils';


interface Crystal {
  layers: RenderableLayer[];
}

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  topLeft: Point;
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
}

const newBounds = (x, y, size): Bounds => ({
  topLeft: {x, y},
  topRight: {x: x+size, y},
  bottomLeft: {x, y: y+size},
  bottomRight: {x: x+size, y: y+size},
});

@Component({
  selector: 'cc-crystal-sheet',
  templateUrl: './crystal-sheet.component.html',
  styleUrls: ['./crystal-sheet.component.scss']
})
export class CrystalSheetComponent extends CrystalEditorComponent {

  static readonly CANVAS_HEIGHT_PX = window.innerHeight
  static readonly CANVAS_ID = 'canvas-sheet';
  static readonly EDIT_BUTTON_ID = 'edit-button';
  static readonly CANVAS_WIDTH_PX = window.innerWidth;
  static readonly GUTTER_PX = 5;

  static readonly NUM_CRYSTALS_WIDTH = 10;
  static readonly CRYSTAL_SIZE_PX = (CrystalSheetComponent.CANVAS_WIDTH_PX /
    CrystalSheetComponent.NUM_CRYSTALS_WIDTH) - (CrystalSheetComponent.GUTTER_PX);

  @ViewChild('sketchSheet')
  root: ElementRef;

  get showPreview(): boolean {
    return this.selectedCrystal?.layers?.length > 0;
  }

  selectedCrystal: Crystal = {layers: []};

  private bounds = new Map<Bounds, Crystal>();

  constructor(
    protected readonly route: ActivatedRoute,
    private readonly router: Router) {
    super(route);
  }

  setup() {
    const width = CrystalSheetComponent.CANVAS_WIDTH_PX +
      CrystalSheetComponent.GUTTER_PX;
    const height = CrystalSheetComponent.CANVAS_HEIGHT_PX +
      CrystalSheetComponent.GUTTER_PX;
    const canvas = this.createCanvas(width, height);
    canvas.parent(this.root.nativeElement);
    canvas.id(CrystalSheetComponent.CANVAS_ID);
    this.noLoop();
    this.angleMode(this.DEGREES);
    this.rectMode(this.CENTER);
  }

  draw = () => {
    this.bounds.clear();
    for (let col = 0; (col*CrystalSheetComponent.CRYSTAL_SIZE_PX) < CrystalSheetComponent.CANVAS_WIDTH_PX-CrystalSheetComponent.CRYSTAL_SIZE_PX; col++) {
      let x = (col*(CrystalSheetComponent.CRYSTAL_SIZE_PX+CrystalSheetComponent.GUTTER_PX));
      for (let row = 0; (row*CrystalSheetComponent.CRYSTAL_SIZE_PX) < CrystalSheetComponent.CANVAS_HEIGHT_PX+CrystalSheetComponent.CRYSTAL_SIZE_PX; row++) {
        this.push();
        let y = (row*(CrystalSheetComponent.CRYSTAL_SIZE_PX+CrystalSheetComponent.GUTTER_PX));
        this.translate(x, y);
        if (col % 2 === 0) this.translate(0, -(CrystalSheetComponent.CRYSTAL_SIZE_PX / 2));
        this.translate(CrystalSheetComponent.GUTTER_PX, CrystalSheetComponent.GUTTER_PX);
        const layers: RenderableLayer[] = [];
        const numLayers = this.floor(this.random(2, 5));
        for (let i = 0; i < numLayers; i++) {
          const params = this.randomLayerData();
          const layer = createRenderableLayer(params);
          layer.render(this);
          layers.push(layer);
        }
        const yBound = col % 2 === 0 ? y - (CrystalSheetComponent.CRYSTAL_SIZE_PX / 2) : y;
        this.bounds.set(newBounds(x, yBound, CrystalSheetComponent.CRYSTAL_SIZE_PX), {layers});
        this.pop();
      }
    }
  };

  mousePressed() {
    const el = document.elementFromPoint(this.mouseX, this.mouseY);
    if (el) {
      if (el.id === CrystalSheetComponent.EDIT_BUTTON_ID) return;
      else if (el.id !== CrystalSheetComponent.CANVAS_ID) {
        this.closeDialog();
        return;
      }
    }
    const crystal = this.findCrystalAtPoint({x: this.mouseX, y: this.mouseY});
    if (!crystal) {
      this.closeDialog();
      return;
    }
    const layers = crystal.layers.map(layer =>
      layer.resize(CrystalComponent.CRYSTAL_SIZE_PX));
    this.selectedCrystal = {layers};
  }

  randomize() {
    super.randomize();
    this.redraw();
  }

  switchToEditMode() {
    const {layers} = this.selectedCrystal;
    this.router.navigate(['/editor'], {
      queryParams: {
        layers: JSON.stringify(layers),
      },
    });
  }

  protected randomLayerData(layerType?: string): Layer {
    const params = super.randomLayerData(layerType);
    return {
      ...params,
      size: CrystalSheetComponent.CRYSTAL_SIZE_PX,
    };
  }

  private findCrystalAtPoint(point: Point): Crystal|undefined {
    if (this.showPreview) return;
    for (const [bounds, crystal] of this.bounds.entries()) {
      if (this.isPointInBounds(point, bounds)) return crystal;
    }
  }

  private isPointInBounds(point: Point, bounds: Bounds): boolean {
    const {x, y} = point;
    const {topLeft, topRight, bottomLeft, bottomRight} = bounds;
    if (x < topLeft.x || x > topRight.x) return false;
    if (y < topLeft.y || y < topRight.y) return false;
    if (x < bottomLeft.x || x > bottomRight.x) return false;
    if (y > bottomLeft.y || y > bottomRight.y) return false;
    return true;
  }

  private closeDialog() {
    this.selectedCrystal = {layers: []};
  }
}
