import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetService } from '../services/planet.service';
import { SatelliteService } from '../services/satellite.service';

@Component({
  selector: 'app-change-planet',
  templateUrl: './change-planet.page.html',
  styleUrls: ['./change-planet.page.scss'],
})
export class ChangePlanetPage implements OnInit {

  planets: any = [];
  satellite: any = {};
  planetToAvoid: any

  constructor(private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router) { }

  ngOnInit() {
    this.getPlanets();
    const localStorageSatellite: any = localStorage.getItem('satellite');
    this.satellite = JSON.parse(localStorageSatellite);
    this.planetToAvoid = this.satellite.planet_id;
  }

  updateParentPlanet(planetId: string) {
    this.satelliteService.update(this.satellite, planetId, null, false).subscribe(response => {
      this.backToPlanetList();
    });
  }

  getPlanets() {
    this.planetService.getAll().subscribe(response => {
      this.planets = response;
      this.planets = this.planets.filter((object: any) => object.id != this.planetToAvoid);
    })
  }

  backToPlanetList() {
    this.router.navigate(['/planet-list']).then(() => {
      window.location.reload();
    });
  }

  backToModifySatellites() {
    this.router.navigateByUrl(`/modify-satellites/${this.planetToAvoid}`)
  }
}