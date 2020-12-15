import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CirclesFormComponent } from './circles-form/circles-form.component';


@NgModule({
  declarations: [CirclesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material design
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [CirclesFormComponent],
})
export class CirclesModule { }
