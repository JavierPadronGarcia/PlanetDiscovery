import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const endPoint = 'http://localhost:8080/planet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(endPoint);
  }

  add(planet: any) {
    let body = new URLSearchParams();
    body.append("name", planet.name);
    body.append("composition", planet.composition);
    return this.httpClient.post(endPoint, body, httpOptions);
  }

  update(planet: any, id: number) {
    let body = new URLSearchParams();
    body.append("name", planet.name);
    body.append("composition", planet.composition);
    return this.httpClient.put(endPoint + `/${id}`, body, httpOptions);
  }

  delete(id: number) {
    return this.httpClient.delete(`${endPoint}/${id}`);
  }

}
