import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrystalEditorComponent } from './crystal/crystal-editor.component';
import { CrystalSheetComponent } from './crystal-sheet/crystal-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: CrystalSheetComponent,
  },
  {
    path: 'editor',
    component: CrystalEditorComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
