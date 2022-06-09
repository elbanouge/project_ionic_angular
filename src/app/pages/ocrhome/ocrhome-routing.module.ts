import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcrhomePage } from './ocrhome.page';

const routes: Routes = [
  {
    path: '',
    component: OcrhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcrhomePageRoutingModule { }
