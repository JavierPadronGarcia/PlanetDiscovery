import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SatelliteService } from '../services/satellite.service';
import { PlanetService } from '../services/planet.service';


@Component({
  selector: 'app-modify-satellites',
  templateUrl: './modify-satellites.page.html',
  styleUrls: ['./modify-satellites.page.scss'],
})
export class ModifySatellitesPage implements OnInit {

  planetId: any
  planet: any = {}
  satellites: any

  showMessageNoSat: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router) { }

  ngOnInit() {
    this.planetId = this.activatedRoute.snapshot.paramMap.get('planetId')
    this.getSatellites(this.planetId)
    this.getPlanet()
  }

  getPlanet() {
    this.planetService.getOne(this.planetId).subscribe(response => {
      this.planet = response
    })
  }

  getSatellites(id: number) {
    this.satelliteService.getAllByPlanet(id).subscribe(response => {
      this.satellites = response;
      this.showMessageNoSat = this.satellites.length == 0 ? true : false
    })
  }

  addSatellite() {

  }

  deleteSatellite(satelliteId: number, planetId: number) {
    this.satelliteService.delete(satelliteId).subscribe(response => {
      this.getSatellites(planetId);
    })
  }

  updateSatellite(satellite: any) {
    console.log(satellite);
  }

  goBack() {
    this.router.navigateByUrl('/planet-list')
  }

}
