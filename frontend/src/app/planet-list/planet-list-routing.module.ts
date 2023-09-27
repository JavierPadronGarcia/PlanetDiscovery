import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetListPage } from './planet-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlanetListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetListPageRoutingModule {}
