import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const endPoint = 'http://localhost:8080/api/planets';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(endPoint);
  }

  getOne(id: number) {
    return this.httpClient.get(`${endPoint}/${id}`);
  }

  add(planet: any, blob: any) {
    console.log(blob)
    let body = new FormData();
    body.append("name", planet.name);
    body.append("composition", planet.composition);
    body.append("file", blob)
    return this.httpClient.post(endPoint, body);
  }

  update(planet: any, blob: any, id: number, updateImage: boolean) {
    let body = new FormData();
    body.append("name", planet.name);
    body.append("composition", planet.composition);
    body.append("file", blob);

    if (updateImage) {
      return this.httpClient.put(endPoint + `/${id}`, body);
    } else {
      return this.httpClient.put(endPoint + `/noImage/${id}`, body)
    }
  }

  delete(id: number) {
    return this.httpClient.delete(`${endPoint}/${id}`);
  }
}
