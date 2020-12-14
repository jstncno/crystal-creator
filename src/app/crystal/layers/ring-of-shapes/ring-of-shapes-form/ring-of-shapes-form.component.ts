import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { RingOfShapesLayer } from '@crystal-creator/crystal/layers/ring-of-shapes/ring-of-shapes';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';


@Component({
  selector: 'cc-ring-of-shapes-form',
  templateUrl: './ring-of-shapes-form.component.html',
  styleUrls: ['./ring-of-shapes-form.component.scss']
})
export class RingOfShapesFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: RingOfShapesLayer;
  @Output()
  layerChange = new EventEmitter<RingOfShapesLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      shapeSides: this.fb.control(this.layer?.shapeSides),
      stepSize: this.fb.control(this.layer?.stepSize),
      maxSteps: this.fb.control(this.layer?.maxSteps),
      radius: this.fb.control(this.layer?.radius),
      center: this.fb.control(this.layer?.center),
      rotation: this.fb.control(this.layer?.rotation),
    };
  }
}
