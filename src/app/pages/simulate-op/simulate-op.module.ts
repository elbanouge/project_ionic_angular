import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulateOpPageRoutingModule } from './simulate-op-routing.module';

import { SimulateOpPage } from './simulate-op.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulateOpPageRoutingModule
  ],
  declarations: [SimulateOpPage]
})
export class SimulateOpPageModule {}
