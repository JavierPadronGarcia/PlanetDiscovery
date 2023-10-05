import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router) { }

  ngOnInit() {
    this.getPlanets();
    this.planetToAvoid = this.getParam('planetId')
    this.satellite = {
      name: this.getParam('name'),
      composition: this.getParam('composition'),
      satId: this.getParam('satId')
    }
  }

  getParam(paramToFind: string) {
    return this.activatedRoute.snapshot.paramMap.get(paramToFind);
  }

  updateParentPlanet(planetId: number) {
    this.satelliteService.update(this.satellite, planetId).subscribe(response => {
      this.backToPlanetList()
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
