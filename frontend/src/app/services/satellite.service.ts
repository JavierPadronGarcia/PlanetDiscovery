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
}
