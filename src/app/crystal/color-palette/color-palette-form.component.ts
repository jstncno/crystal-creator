import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorPaletteService } from './color-palette.service';

@Component({
  selector: 'cc-color-palette-form',
  templateUrl: './color-palette-form.component.html',
  styleUrls: ['./color-palette-form.component.scss']
})
export class ColorPaletteFormComponent implements OnInit {

  @Input()
  colors: string[] = [];

  @Output()
  colorsChange = new EventEmitter<string[]>();

  form: FormGroup;

  get colorsFormArray() {
    return this.form.get('colors') as FormArray;
  }

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly palette: ColorPaletteService) { }

  ngOnInit(): void {
    this.setForm();
    this.setColorsFromForm();
  }

  addColor() {
    const hex = this.colors[this.colors.length-1];
    this.colors.push(hex);
    this.setForm();
    this.setColorsFromForm();
  }

  removeColor(event: MouseEvent, index: number) {
    event.stopPropagation();
    this.colorsFormArray.removeAt(index);
  }

  changeColor(color: string, index: number) {
    if (index < 0 || index >= this.colors.length) return;
    this.colorsFormArray.controls[index].setValue({hex: color});
    this.setColorsFromForm();
  }

  private setColorsFromForm() {
    const {colors} = this.form.getRawValue();
    if (!colors) return;
    this.colors = colors.map(c => c.hex);
    this.palette.setColors(this.colors);
    this.colorsChange.emit(this.colors);
  }

  private setForm() {
    const params = this.generatePaletteFormControls();
    this.form = this.fb.group(params, {updateOn: 'blur'});
  }

  private generatePaletteFormControls() {
    const paletteControls = this.colors
      .map((color: string) => this.fb.group({
        hex: this.fb.control(color, Validators.required),
      }));
    return {
      colors: this.fb.array(paletteControls, Validators.required),
    };
  }
}
