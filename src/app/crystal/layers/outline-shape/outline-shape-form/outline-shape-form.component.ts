import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { OutlineShapeLayer } from '@crystal-creator/crystal/layers/outline-shape/outline-shape';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';


@Component({
  selector: 'cc-outline-shape-form',
  templateUrl: './outline-shape-form.component.html',
  styleUrls: ['./outline-shape-form.component.scss']
})
export class OutlineShapeFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: OutlineShapeLayer;
  @Output()
  layerChange = new EventEmitter<OutlineShapeLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      shape: this.fb.control(this.layer?.shape ?? 'hexagon'),
    };
  }
}
