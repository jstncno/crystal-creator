import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CenteredShapeModule } from './centered-shape/centered-shape.module';
import { CirclesModule } from './circles/circles.module';
import { LinesModule } from './lines/lines.module';
import { RingOfShapesModule } from './ring-of-shapes/ring-of-shapes.module';
import { OutlineShapeModule } from './outline-shape/outline-shape.module';
import { SteppedHexagonsModule } from './stepped-hexagons/stepped-hexagons.module';
import { LayersFormComponent } from './layers-form.component';


@NgModule({
  declarations: [LayersFormComponent],
  imports: [
    CommonModule,
    CenteredShapeModule,
    CirclesModule,
    LinesModule,
    RingOfShapesModule,
    OutlineShapeModule,
    SteppedHexagonsModule,
    // Angular Material
    DragDropModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    CenteredShapeModule,
    CirclesModule,
    LinesModule,
    RingOfShapesModule,
    OutlineShapeModule,
    SteppedHexagonsModule,
    LayersFormComponent,
  ],
})
export class LayersModule { }
