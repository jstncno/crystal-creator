import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CrystalModule } from '@crystal-creator/crystal/crystal.module';
import { CrystalSheetComponent } from './crystal-sheet.component';
import { InfoPanelComponent } from './info-panel.component';


@NgModule({
  declarations: [CrystalSheetComponent, InfoPanelComponent],
  imports: [
    CommonModule,
    CrystalModule,
    // Angular Material
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [CrystalSheetComponent],
})
export class CrystalSheetModule { }
