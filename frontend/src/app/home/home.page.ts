import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlanetService } from '../services/planet.service';
import { SatelliteService } from '../services/satellite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  satelliteVisibility: any = {};
  iconVisibility: any = {};
  planets: any = [];
  satellites: any = {};

  iconName: string = 'chevron-down';
  iconUp: string = 'chevron-up';
  iconDown: string = 'chevron-down';
  isOpen: boolean = false;

  constructor(private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router) {
    this.getAllPlanets()
  }

  getSatellitesByPlanet(id: number) {
    return this.satelliteService.getAllByPlanet(id)
  }

  getAllPlanets() {
    this.planetService.getAll().subscribe(response => {
      this.planets = response;
      this.planets.sort((a: any, b: any) => a.id - b.id)
        .map((planet: any) => {
          this.getSatellitesByPlanet(planet.id).subscribe(response => {
            this.satellites[planet.id] = response

            let satVisibility = this.satelliteVisibility[planet.id]

            this.iconVisibility[planet.id] = (this.satellites[planet.id].length == 0) ? false : true
            this.satelliteVisibility[planet.id] = (satVisibility == undefined) || (this.satellites[planet.id].length == 0) ? false : true
          })
        });
    })
  }

  changeIcon(id: number) {
    const icon: any = document.getElementById(`icon${id}`)
    icon.name = icon.name == this.iconDown ? this.iconUp : this.iconDown

    this.satelliteVisibility[id] = this.satelliteVisibility[id] == false ? true : false
  }




}
