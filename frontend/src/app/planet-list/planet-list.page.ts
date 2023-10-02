import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanetService } from '../services/planet.service';

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
  ionicForm: FormGroup;
  planetName!: string;
  planetComposition!: string
  planets: any = [];
  idToUpdate: number = 0;

  iconName: string = 'chevron-down';
  iconUp: string = 'chevron-up';
  iconDown: string = 'chevron-down';
  isOpen: boolean = false;

  showAddButton: boolean = true;
  showUpdateButtons: boolean = false;



  constructor(private planetService: PlanetService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllPlanets();

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
    const icon: any = document.getElementById(`${id}`)
    icon.name = icon.name == this.iconDown ? this.iconUp : this.iconDown
  }

  showSatellites() {

  }

  getAllPlanets() {
    this.planetService.getAll().subscribe(response => {
      this.planets = response;
      console.log(this.planets)
    })
  }

  insertPlanet() {
    let planet: Planet = {
      name: this.planetName,
      composition: this.planetComposition
    }
    this.planetService.add(planet).subscribe(response => {
      this.getAllPlanets();
      this.planetName = "";
      this.planetComposition = "";
    });
  }

  putInfoInForm(planet: any) {
    this.idToUpdate = planet.id;
    this.showAddButton = false;
    this.showUpdateButtons = true;

    this.planetName = planet.name;
    this.planetComposition = planet.composition;
  }

  updatePlanet() {
    const planet: Planet = {
      name: this.planetName,
      composition: this.planetComposition
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

  clearForm() {
    this.planetName = "";
    this.planetComposition = "";
    this.showAddButton = true;
    this.showUpdateButtons = false;
  }
}