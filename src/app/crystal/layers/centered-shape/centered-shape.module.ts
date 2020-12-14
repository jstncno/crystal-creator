import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CenteredShapeFormComponent } from './centered-shape-form/centered-shape-form.component';


@NgModule({
  declarations: [CenteredShapeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [CenteredShapeFormComponent],
})
export class CenteredShapeModule { }
