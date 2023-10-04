import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'planet-list',
    loadChildren: () => import('./planet-list/planet-list.module').then( m => m.PlanetListPageModule)
  },
  {
    path: 'modify-satellites/:planetId',
    loadChildren: () => import('./modify-satellites/modify-satellites.module').then( m => m.ModifySatellitesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
