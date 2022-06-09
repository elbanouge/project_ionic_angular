import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendOTPPageRoutingModule } from './send-otp-routing.module';

import { SendOTPPage } from './send-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendOTPPageRoutingModule
  ],
  declarations: [SendOTPPage]
})
export class SendOTPPageModule { }
