import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePlanetPageRoutingModule } from './change-planet-routing.module';

import { ChangePlanetPage } from './change-planet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePlanetPageRoutingModule
  ],
  declarations: [ChangePlanetPage]
})
export class ChangePlanetPageModule {}
