import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DottedLines } from '@crystal-creator/crystal/layers/lines/lines';
import { BaseLayerForm } from '@crystal-creator/crystal/layers/base-layer-form';

@Component({
  selector: 'cc-dotted-lines-form',
  templateUrl: './dotted-lines-form.component.html',
  styleUrls: ['./dotted-lines-form.component.scss']
})
export class DottedLinesFormComponent extends BaseLayerForm implements OnInit {

  @Input()
  layer: DottedLines;
  @Output()
  layerChange = new EventEmitter<DottedLines>();

  protected generateLayerFormGroupParams(): {} {
    const baseParams = super.generateLayerFormGroupParams();
    return {
      ...baseParams,
      numLines: this.fb.control(this.layer?.numLines ?? this.layer?.sides),
      dotSize: this.fb.control(this.layer?.dotSize),
      centerOffset: this.fb.control(this.layer?.centerOffset),
    };
  }
}
