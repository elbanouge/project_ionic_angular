import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetpasswordPage } from './setpassword.page';

const routes: Routes = [
  {
    path: '',
    component: SetpasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetpasswordPageRoutingModule { }
