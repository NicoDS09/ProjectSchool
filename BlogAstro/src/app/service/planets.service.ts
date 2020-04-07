import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  public planets = "http://localhost:3000/AstroBlog/planet/"

  constructor(private http: HttpClient) { }

  getPlanet(planet): Observable<any[]> {
    return this.http.get<any[]>(this.planets + planet);
  }
}
