import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CrystalComponent } from './crystal/crystal.component';
import { CrystalSheetComponent } from './crystal-sheet/crystal-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: CrystalSheetComponent,
  },
  {
    path: 'editor',
    component: CrystalComponent,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
