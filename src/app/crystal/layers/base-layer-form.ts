import { Directive, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Layer } from '@crystal-creator/crystal/layers/base-layer';
import { BroadcastService } from '../broadcast.service';

@Directive()
export class BaseLayerForm implements OnInit {
  static readonly NUM_SIDES = 6;
  static readonly SIZE_PIXELS = 500;

  layer?: Layer;
  layerChange: EventEmitter<Layer> = new EventEmitter<Layer>();
  form: FormGroup;

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly broadcast: BroadcastService) { }

  ngOnInit() {
    this.setForm();
    this.broadcast.onDraw$.subscribe(_ => this.setForm());
  }

  protected setForm() {
    const params = this.generateLayerFormGroupParams();
    this.form = this.fb.group(params, { updateOn: 'blur' });
    this.form.valueChanges.subscribe(_ => this.form.valid && this.emit());
  }

  protected emit() {
    this.layerChange.emit(this.form.getRawValue());
  }

  protected generateLayerFormGroupParams(): {} {
    return {
      name: this.fb.control(this.layer?.name, Validators.required),
      size: this.fb.control(
        this.layer?.size ?? BaseLayerForm.SIZE_PIXELS, Validators.required),
      sides: this.fb.control(
        this.layer?.sides ?? BaseLayerForm.NUM_SIDES, Validators.required),
      strokeColor: this.fb.control(this.layer?.strokeColor),
      strokeWeight: this.fb.control(this.layer?.strokeWeight),
      fillColor: this.fb.control(this.layer?.fillColor),
    };
  }
}