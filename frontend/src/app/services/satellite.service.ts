import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const endPoint = 'http://localhost:8080/api/satellites';

@Injectable({
  providedIn: 'root'
})
export class SatelliteService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(endPoint);
  }

  getAllByPlanet(id: number) {
    return this.httpClient.get(`${endPoint}/planet/${id}`);
  }

  add(satellite: any, planetId: number, blob: any) {
    let body = new FormData();
    body.append("name", satellite.name);
    body.append("composition", satellite.composition);
    body.append("file", blob);
    return this.httpClient.post(`${endPoint}/${planetId}`, body);
  }

  update(satellite: any, planetId: string, blob: any, updateImage: boolean) {
    let body = new FormData();
    body.append("name", satellite.name);
    body.append("composition", satellite.composition);
    body.append("blob", blob);
    body.append("planet_id", planetId);

    console.log(satellite)

    if (updateImage) {
      return this.httpClient.put(`${endPoint}/${satellite.id}`, body)
    } else {
      return this.httpClient.put(`${endPoint}/noImage/${satellite.id}`, body);
    }
  }

  delete(id: number) {
    return this.httpClient.delete(`${endPoint}/${id}`);
  }
}
