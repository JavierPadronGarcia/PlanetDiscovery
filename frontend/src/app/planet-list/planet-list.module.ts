import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlanetListPageRoutingModule } from './planet-list-routing.module';
import { PlanetListPage } from './planet-list.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanetListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlanetListPage]
})
export class PlanetListPageModule { }
