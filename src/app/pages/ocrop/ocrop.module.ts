import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcropPageRoutingModule } from './ocrop-routing.module';

import { OcropPage } from './ocrop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcropPageRoutingModule
  ],
  declarations: [OcropPage]
})
export class OcropPageModule { }
