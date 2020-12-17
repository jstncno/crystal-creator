import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CrystalComponent } from './crystal.component';
import { ColorPaletteModule } from './color-palette/color-palette.module';
import { LayersModule } from './layers/layers.module';

@NgModule({
  declarations: [CrystalComponent],
  imports: [
    CommonModule,
    ColorPaletteModule,
    LayersModule,
    // Angular Material
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    CrystalComponent,
    ColorPaletteModule,
    LayersModule,
  ],
})
export class CrystalModule { }
