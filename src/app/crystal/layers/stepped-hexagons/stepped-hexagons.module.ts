import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SteppedHexagonsFormComponent } from './stepped-hexagons-form/stepped-hexagons-form.component';

@NgModule({
  declarations: [SteppedHexagonsFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [SteppedHexagonsFormComponent],
})
export class SteppedHexagonsModule { }
