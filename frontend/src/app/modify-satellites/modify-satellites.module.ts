import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifySatellitesPageRoutingModule } from './modify-satellites-routing.module';

import { ModifySatellitesPage } from './modify-satellites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifySatellitesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModifySatellitesPage]
})
export class ModifySatellitesPageModule { }
