import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CenteredShapeLayer } from '@crystal-creator/crystal/layers/centered-shape/centered-shape';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';

@Component({
  selector: 'cc-centered-shape-form',
  templateUrl: './centered-shape-form.component.html',
  styleUrls: ['./centered-shape-form.component.scss']
})
export class CenteredShapeFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: CenteredShapeLayer;
  @Output()
  layerChange = new EventEmitter<CenteredShapeLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      shape: this.fb.control(this.layer?.shape ?? 'hexagon'),
      shapeSize: this.fb.control(this.layer?.shapeSize ?? 30),
      stepsOut: this.fb.control(this.layer?.stepsOut ?? 9),
      rotation: this.fb.control(this.layer?.rotation ?? 0),
    };
  }
}
