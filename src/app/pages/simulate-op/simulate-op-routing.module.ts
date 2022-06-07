import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulateOpPage } from './simulate-op.page';

const routes: Routes = [
  {
    path: '',
    component: SimulateOpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulateOpPageRoutingModule { }
