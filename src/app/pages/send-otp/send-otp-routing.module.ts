import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendOTPPage } from './send-otp.page';

const routes: Routes = [
  {
    path: '',
    component: SendOTPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendOTPPageRoutingModule {}
