import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalinfosPageRoutingModule } from './personalinfos-routing.module';

import { PersonalinfosPage } from './personalinfos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalinfosPageRoutingModule, ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  declarations: [PersonalinfosPage]
})
export class PersonalinfosPageModule { }
