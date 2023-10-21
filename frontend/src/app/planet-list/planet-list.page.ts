import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanetService } from '../services/planet.service';
import { SatelliteService } from '../services/satellite.service';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';

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

  @ViewChild('scrollTopContainer') scrollTopContainer: ElementRef;

  satelliteVisibility: any = {};
  iconVisibility: any = {};
  ionicForm: FormGroup;
  planets: any = [];
  satellites: any = {};
  idToUpdate: number = 0;
  planetId: number = 0;
  capturedPhoto: any = "";

  updateImage: boolean = false;

  iconName: string = 'chevron-down';
  iconUp: string = 'chevron-up';
  iconDown: string = 'chevron-down';
  isOpen: boolean = false;

  showAddButton: boolean = true;
  showUpdateButtons: boolean = false;
  showSatellites: boolean = false;

  constructor(private planetService: PlanetService,
    private satelliteService: SatelliteService,
    public formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPlanets();
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      composition: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('[A-Zá-ú][a-zá-ú]+(?:,[ ]?[A-Zá-ú][a-zá-ú]+)*')],
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

  async insertPlanet() {
    let planetName = this.ionicForm.get("name");
    let planetComposition = this.ionicForm.get("composition")
    let blob = null;

    if (this.capturedPhoto != "") {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    let planet: Planet = {
      name: planetName?.value,
      composition: planetComposition?.value
    }
    this.planetService.add(planet, blob).subscribe(response => {
      this.getAllPlanets();
      this.clearForm();
    });
  }

  async updatePlanet() {
    let planetName = this.ionicForm.get("name");
    let planetComposition = this.ionicForm.get("composition")
    let blob = null;

    const planet: Planet = {
      name: planetName?.value,
      composition: planetComposition?.value
    }

    if (this.capturedPhoto != "" && this.updateImage) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    this.planetService.update(planet, blob, this.idToUpdate, this.updateImage).subscribe(response => {
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
    this.updateImage = false;
    if (planet.filename) {
      this.capturedPhoto = "http://localhost:8080/images/" + planet.filename
    } else {
      this.capturedPhoto = "../../assets/No-Image-Placeholder.svg"
    }

    let planetName = this.ionicForm.get("name")
    let planetComposition = this.ionicForm.get("composition")

    this.idToUpdate = planet.id;
    planetName?.setValue(planet.name);
    planetComposition?.setValue(planet.composition);

    this.showAddButton = false;
    this.showUpdateButtons = true;
    if (this.scrollTopContainer && this.scrollTopContainer.nativeElement) {
      this.scrollTopContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
        top: this.scrollTopContainer.nativeElement.getBoundingClientRect().top
      });
    }
  }

  clearForm() {
    this.ionicForm.get("name")?.setValue("")
    this.ionicForm.get("composition")?.setValue("")
    this.showAddButton = true;
    this.showUpdateButtons = false;
    this.capturedPhoto = "";
  }

  goToModifySatellites(planetId: string) {
    this.router.navigateByUrl(`modify-satellites/${planetId}`);
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
    this.updateImage = true;
  }

  discardImage() {
    this.capturedPhoto = "";
    this.updateImage = true;
  }
}