import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTitle } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanetService } from '../services/planet.service';
import { SatelliteService } from '../services/satellite.service';
import { Router } from '@angular/router';

interface Planet {
  name: string;
  composition: string;
}

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.page.html',
  styleUrls: ['./planet-list.page.scss'],
})
export class PlanetListPage implements OnInit {

  @ViewChild(IonTitle, { static: true }) ionTitle: IonTitle;
  satelliteVisibility: any = {};
  ionicForm: FormGroup;
  title: any;
  planets: any = [];
  satellites: any = {};
  idToUpdate: number = 0;
  planetId: number = 0;

  iconName: string = 'chevron-down';
  iconUp: string = 'chevron-up';
  iconDown: string = 'chevron-down';
  isOpen: boolean = false;

  showAddButton: boolean = true;
  showUpdateButtons: boolean = false;
  showUpdateSatellite: boolean = false;
  showAddSatellite: boolean = false;
  showSatellites: boolean = false;
  showAddSatButton: boolean = false;
  showSatellitesPlanetDetail: boolean = false;

  constructor(private planetService: PlanetService,
    private satelliteService: SatelliteService,
    public formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.getAllPlanets();
    this.title = document.querySelector("ion-title")?.innerText;
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      composition: ['', [Validators.required, Validators.pattern('[A-Z][a-z]+(?:,[ ]?[A-Z][a-z]+)*')],
      ],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  changeIcon(id: number) {
    const icon: any = document.getElementById(`icon${id}`)
    icon.name = icon.name == this.iconDown ? this.iconUp : this.iconDown

    this.satelliteVisibility[id] = this.satelliteVisibility[id] == false ? true : false
  }

  getSatellitesByPlanet(id: number) {
    return this.satelliteService.getAllByPlanet(id)
  }

  getAllPlanets() {
    this.showSatellitesPlanetDetail = false
    this.planetService.getAll().subscribe(response => {
      this.planets = response;
      this.planets.sort((a: any, b: any) => a.id - b.id)
        .map((planet: any) => {
          this.getSatellitesByPlanet(planet.id).subscribe(response => {
            let satVisibility = this.satelliteVisibility[planet.id]
            this.satellites[planet.id] = response
            this.satelliteVisibility[planet.id] = (satVisibility == undefined) || (this.satellites[planet.id].length == 0) ? false : true
          })
        });
    })
  }

  insertPlanet() {
    let planetName = this.ionicForm.get("name");
    let planetComposition = this.ionicForm.get("composition")

    let planet: Planet = {
      name: planetName?.value,
      composition: planetComposition?.value
    }
    this.planetService.add(planet).subscribe(response => {
      this.getAllPlanets();
      this.clearForm();
    });
  }

  updatePlanet() {
    let planetName = this.ionicForm.get("name");
    let planetComposition = this.ionicForm.get("composition")

    const planet: Planet = {
      name: planetName?.value,
      composition: planetComposition?.value
    }

    this.planetService.update(planet, this.idToUpdate).subscribe(response => {
      this.getAllPlanets();
      this.showAddButton = true;
      this.showUpdateButtons = false;
      this.clearForm();
    })
  }

  deletePlanet(id: number) {
    this.planetService.delete(id).subscribe(response => {
      this.getAllPlanets();
    })
  }

  putInfoInForm(planet: any) {
    let planetName = this.ionicForm.get("name")
    let planetComposition = this.ionicForm.get("composition")

    this.idToUpdate = planet.id;
    planetName?.setValue(planet.name);
    planetComposition?.setValue(planet.composition);

    this.showAddButton = false;
    this.showUpdateButtons = true;
  }

  clearForm() {
    this.ionicForm.get("name")?.setValue("")
    this.ionicForm.get("composition")?.setValue("")
    this.showAddButton = true;
    this.showUpdateButtons = false;
  }

  backToHome() {
    this.router.navigateByUrl('/');
  }

  goToModifySatellites(planetId: string) {
    this.router.navigateByUrl(`modify-satellites/${planetId}`);
  }

}