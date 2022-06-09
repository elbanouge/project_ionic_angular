import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulateResPageRoutingModule } from './simulate-res-routing.module';

import { SimulateResPage } from './simulate-res.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulateResPageRoutingModule
  ],
  declarations: [SimulateResPage]
})
export class SimulateResPageModule { }
