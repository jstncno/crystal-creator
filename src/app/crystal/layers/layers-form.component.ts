import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Layer } from '@crystal-creator/crystal/layers/base-layer';

@Component({
  selector: 'cc-layers-form',
  templateUrl: './layers-form.component.html',
  styleUrls: ['./layers-form.component.scss']
})
export class LayersFormComponent implements OnInit {

  @Input()
  layers: Layer[] = [];

  @Output()
  layersChange = new EventEmitter<Layer[]>();

  @Output()
  addLayerPress = new EventEmitter<void>();

  lastOpenIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onLayersChange() {
    this.layersChange.emit(this.layers);
  }

  stopEventPropagation(event: Event) {
    event.stopPropagation();
  }

  addLayer() {
    this.addLayerPress.emit();
    this.lastOpenIndex = this.layers.length - 1;
  }

  removeLayer(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.layers.splice(index, 1);
    this.layersChange.emit(this.layers);
  }
}
