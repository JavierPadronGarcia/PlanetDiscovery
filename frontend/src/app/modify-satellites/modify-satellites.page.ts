import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SatelliteService } from '../services/satellite.service';
import { PlanetService } from '../services/planet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-modify-satellites',
  templateUrl: './modify-satellites.page.html',
  styleUrls: ['./modify-satellites.page.scss'],
})
export class ModifySatellitesPage implements OnInit {

  @ViewChild('scrollTopContainer') scrollTopContainer: ElementRef;

  planetId: any
  planet: any = {}
  satellites: any
  satelliteForm: FormGroup
  capturedPhoto: any = "";

  updateImage: boolean = false;

  idToUpdate: number

  showUpdateButtons: boolean = false;
  showAddButton: boolean = true;
  showMessageNoSat: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planetService: PlanetService,
    private satelliteService: SatelliteService,
    private router: Router,
    public formBuilder: FormBuilder,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.planetId = this.activatedRoute.snapshot.paramMap.get('planetId')
    this.getSatellites(this.planetId)
    this.getPlanet()
    this.satelliteForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      composition: ['', [Validators.required, Validators.maxLength(200), Validators.pattern('[A-Zá-ú][a-zá-ú]+(?:,[ ]?[A-Zá-ú][a-zá-ú]+)*')],
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

  async addSatellite() {
    let satName = this.satelliteForm.get("name");
    let satComposition = this.satelliteForm.get("composition")
    let blob = null;

    if (this.capturedPhoto != "") {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    let satellite: any = {
      name: satName?.value,
      composition: satComposition?.value
    }
    this.satelliteService.add(satellite, this.planetId, blob).subscribe(response => {
      window.location.reload();
    })
  }

  deleteSatellite(satelliteId: number, planetId: number) {
    this.satelliteService.delete(satelliteId).subscribe(response => {
      this.getSatellites(planetId);
    })
  }

  async updateSatellite() {

    let satName = this.satelliteForm.get("name");
    let satComposition = this.satelliteForm.get("composition");
    let blob = null;

    const satellite: any = {
      id: this.idToUpdate,
      name: satName?.value,
      composition: satComposition?.value
    }

    if (this.capturedPhoto != "" && this.updateImage) {
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
    }

    this.satelliteService.update(satellite, this.planetId, blob, this.updateImage).subscribe(response => {
      this.showAddButton = true;
      this.showUpdateButtons = false;
      window.location.reload();
    })

    this.showAddButton = true;
    this.showUpdateButtons = false;
  }

  putInfoInForm(satellite: any) {
    this.updateImage = false;

    if (satellite.filename) {
      this.capturedPhoto = "http://localhost:8080/images/" + satellite.filename
    } else {
      this.capturedPhoto = "../../assets/No-Image-Placeholder.svg"
    }

    let satName = this.satelliteForm.get("name")
    let satComposition = this.satelliteForm.get("composition")
    this.idToUpdate = satellite.id;
    satName?.setValue(satellite.name);
    satComposition?.setValue(satellite.composition);

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
    let satName = this.satelliteForm.get("name")
    let satComposition = this.satelliteForm.get("composition")

    satName?.setValue("");
    satComposition?.setValue("");
    this.showAddButton = true;
    this.showUpdateButtons = false;
    this.capturedPhoto = "";
  }

  goToChangePanet(satellite: any) {
    let stringifiedSatellite = JSON.stringify(satellite);
    localStorage.setItem('satellite', stringifiedSatellite);
    this.router.navigateByUrl(`/change-planet`)
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    })
    this.updateImage = true;
  }

  discardImage() {
    this.capturedPhoto = "";
    this.updateImage = true;
  }

}
