import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerModule } from 'ngx-color-picker';

import { ColorPaletteFormComponent } from './color-palette-form.component';


@NgModule({
  declarations: [ColorPaletteFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ColorPickerModule,
    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [ColorPaletteFormComponent],
})
export class ColorPaletteModule { }
