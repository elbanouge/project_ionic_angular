import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalinfosPage } from './personalinfos.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalinfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalinfosPageRoutingModule { }
