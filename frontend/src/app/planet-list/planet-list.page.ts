import { Component, OnInit } from '@angular/core';
import { PlanetService } from '../services/planet.service';



@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.page.html',
  styleUrls: ['./planet-list.page.scss'],
})
export class PlanetListPage implements OnInit {

  planetName!: string;
  planetDiscoveryDate!: string

  planets: any = [];
  idToUpdate: number = 0;

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.getAllPlanets();
    
  }

  getAllPlanets() {
    this.planetService.getAll().subscribe(response => {
      this.planets = response;
    })
  }

  insertPlanet() {
    const name = document.getElementById("name") as HTMLInputElement;
    const discoveryDate = document.getElementById("date") as HTMLInputElement;
    let planet = {
      name: name.value,
      discoveryDate: this.revertFormatDate(discoveryDate.value)
    }
    this.planetService.add(planet).subscribe(response => {
      this.getAllPlanets();
    });
  }

  putInfoInForm(planet: any) {
    this.idToUpdate = planet.id;
    (document.getElementById("add-button") as HTMLButtonElement).style.display = "none";
    (document.getElementById("confirm-update-button") as HTMLButtonElement).style.display = "block";
    this.planetName = planet.name;
    this.planetDiscoveryDate = planet.discoveryDate;
  }

  updatePlanet() {
    let planet = {
      name: this.planetName,
      discoveryDate: this.planetDiscoveryDate
    }
    this.planetService.update(planet, this.idToUpdate).subscribe(response => {
      this.getAllPlanets();
      (document.getElementById("add-button") as HTMLButtonElement).style.display = "inline-block";
      (document.getElementById("confirm-update-button") as HTMLButtonElement).style.display = "none";
    })
  }

  deletePlanet(id: number) {
    this.planetService.delete(id).subscribe(response => {
      this.getAllPlanets();
    })
  }

  //format the date to DD-MM-YYYY
  formatDate(date: string) {
    const dateToChange = new Date(date);
    const day = (dateToChange.getDate()+1).toString().padStart(2, '0');
    const month = (dateToChange.getMonth() + 1).toString().padStart(2, '0');
    const year = dateToChange.getFullYear().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  //format the date to YYYY-MM-DD
  revertFormatDate(date: string) {
    const dateToChange = new Date(date);
    const day = (dateToChange.getDate()+1).toString().padStart(2, '0');
    const month = (dateToChange.getMonth() + 1).toString().padStart(2, '0');
    const year = dateToChange.getFullYear().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
