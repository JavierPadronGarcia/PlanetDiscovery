import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SatelliteService } from '../services/satellite.service';
import { PlanetService } from '../services/planet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-modify-satellites',
  templateUrl: './modify-satellites.page.html',
  styleUrls: ['./modify-satellites.page.scss'],
})
export class ModifySatellitesPage implements OnInit {

  planetId: any
  planet: any = {}
  satellites: any
  satelliteForm: FormGroup

  idToUpdate: number

  showUpdateButtons: boolean = false;
  showAddButton: boolean = true;
  showMessageNoSat: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.planetId = this.activatedRoute.snapshot.paramMap.get('planetId')
    this.getSatellites(this.planetId)
    this.getPlanet()
    this.satelliteForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      composition: ['', [Validators.required, Validators.pattern('[A-Z][a-z]+(?:,[ ]?[A-Z][a-z]+)*')],
      ],
    });
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
    let satName = this.satelliteForm.get("name");
    let satComposition = this.satelliteForm.get("composition")

    let satellite: any = {
      name: satName?.value,
      composition: satComposition?.value
    }
    this.satelliteService.add(satellite, this.planetId).subscribe(response => {
      window.location.reload();
    })
  }

  deleteSatellite(satelliteId: number, planetId: number) {
    this.satelliteService.delete(satelliteId).subscribe(response => {
      this.getSatellites(planetId);
    })
  }

  updateSatellite() {

    let satName = this.satelliteForm.get("name");
    let satComposition = this.satelliteForm.get("composition")

    const satellite: any = {
      name: satName?.value,
      composition: satComposition?.value,
      idSat: this.idToUpdate
    }

    this.satelliteService.update(satellite, this.planetId).subscribe(response => {
      this.showAddButton = true;
      this.showUpdateButtons = false;
      window.location.reload();
    })

    this.showAddButton = true;
    this.showUpdateButtons = false;
  }

  putInfoInForm(satellite: any) {
    let satName = this.satelliteForm.get("name")
    let satComposition = this.satelliteForm.get("composition")

    this.idToUpdate = satellite.id;
    satName?.setValue(satellite.name);
    satComposition?.setValue(satellite.composition);

    this.showAddButton = false;
    this.showUpdateButtons = true;
  }

  clearForm() {
    let satName = this.satelliteForm.get("name")
    let satComposition = this.satelliteForm.get("composition")

    satName?.setValue("");
    satComposition?.setValue("");
    this.showAddButton = true;
    this.showUpdateButtons = false;
  }
  
  goBack() {
    this.router.navigateByUrl('/planet-list')
  }

}
