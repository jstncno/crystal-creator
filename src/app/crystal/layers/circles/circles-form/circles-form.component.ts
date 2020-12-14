import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CirclesLayer } from '@crystal-creator/crystal/layers/circles/circles';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';

@Component({
  selector: 'cc-circles-form',
  templateUrl: './circles-form.component.html',
  styleUrls: ['./circles-form.component.scss']
})
export class CirclesFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: CirclesLayer;
  @Output()
  layerChange = new EventEmitter<CirclesLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      diameter: this.fb.control(this.layer?.diameter),
      position: this.fb.control(this.layer?.position),
    };
  }
}
