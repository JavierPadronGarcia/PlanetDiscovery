import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const endPoint = 'http://localhost:8080/satellite';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(endPoint);
  }

  getAllByPlanet(id: number) {
    return this.httpClient.get(`${endPoint}/planet_id/${id}`);
  }

  add(satellite: any, planetId: number) {
    let body = new URLSearchParams();
    body.append("name", satellite.name);
    body.append("composition", satellite.composition);
    return this.httpClient.post(`${endPoint}/planet_id/${planetId}`, body, httpOptions);
  }

  update(satellite: any, planetId: number) {
    let body = new URLSearchParams();
    body.append("name", satellite.name);
    body.append("composition", satellite.composition);
    body.append("idSat", satellite.satId);
    return this.httpClient.put(`${endPoint}/planet_id/${planetId}`, body, httpOptions)
  }

  delete(id: number) {
    return this.httpClient.delete(`${endPoint}/${id}`);
  }
}
