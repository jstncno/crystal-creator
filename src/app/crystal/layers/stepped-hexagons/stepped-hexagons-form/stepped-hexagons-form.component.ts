import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SteppedHexagonsLayer } from '@crystal-creator/crystal/layers/stepped-hexagons/stepped-hexagons';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';


@Component({
  selector: 'cc-stepped-hexagons-form',
  templateUrl: './stepped-hexagons-form.component.html',
  styleUrls: ['./stepped-hexagons-form.component.scss']
})
export class SteppedHexagonsFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: SteppedHexagonsLayer;
  @Output()
  layerChange = new EventEmitter<SteppedHexagonsLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      steps: this.fb.control(this.layer?.steps),
      minSteps: this.fb.control(this.layer?.minSteps),
      maxSteps: this.fb.control(this.layer?.maxSteps),
      rotation: this.fb.control(this.layer?.rotation),
      centerOffset: this.fb.control(this.layer?.centerOffset),
    };
  }
}
