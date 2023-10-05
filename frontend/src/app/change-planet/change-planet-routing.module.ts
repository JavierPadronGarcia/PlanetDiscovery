import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePlanetPage } from './change-planet.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePlanetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePlanetPageRoutingModule {}
