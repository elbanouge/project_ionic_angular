import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcropPage } from './ocrop.page';

const routes: Routes = [
  {
    path: '',
    component: OcropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcropPageRoutingModule {}
