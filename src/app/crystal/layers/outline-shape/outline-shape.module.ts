import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { OutlineShapeFormComponent } from './outline-shape-form/outline-shape-form.component';


@NgModule({
  declarations: [OutlineShapeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [OutlineShapeFormComponent],
})
export class OutlineShapeModule { }
