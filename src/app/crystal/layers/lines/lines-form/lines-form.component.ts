import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LinesLayer } from '@crystal-creator/crystal/layers/lines/lines';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';

@Component({
  selector: 'cc-lines-form',
  templateUrl: './lines-form.component.html',
  styleUrls: ['./lines-form.component.scss']
})
export class LinesFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: LinesLayer;
  @Output()
  layerChange = new EventEmitter<LinesLayer>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      numSteps: this.fb.control(this.layer?.numSteps),
      numLines: this.fb.control(this.layer?.numLines),
      start: this.fb.control(this.layer?.start),
      end: this.fb.control(this.layer?.end),
    };
  }
}
