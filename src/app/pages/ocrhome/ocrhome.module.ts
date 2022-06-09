import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcrhomePageRoutingModule } from './ocrhome-routing.module';

import { OcrhomePage } from './ocrhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcrhomePageRoutingModule
  ],
  declarations: [OcrhomePage]
})
export class OcrhomePageModule { }
