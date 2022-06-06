import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulateResPage } from './simulate-res.page';

const routes: Routes = [
  {
    path: '',
    component: SimulateResPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulateResPageRoutingModule {}
