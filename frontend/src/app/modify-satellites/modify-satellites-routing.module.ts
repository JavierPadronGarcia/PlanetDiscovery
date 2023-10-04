import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifySatellitesPage } from './modify-satellites.page';

const routes: Routes = [
  {
    path: '',
    component: ModifySatellitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifySatellitesPageRoutingModule {}
