import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../classes/bike';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

const bikesApiUrl = '/server/api/bikes';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private httpClient: HttpClient) { }

  public getBikes(): Observable<Bike[]> {
    return this.httpClient.get<Bike[]>(bikesApiUrl);
  }

  public getBike(id: number): Observable<Bike> {
    return this.httpClient.get<Bike>(`${bikesApiUrl}/${id}`);
  }

  public createBike(bike: Bike): Observable<any> {
    console.log('send form data to backend server...');
    const body = JSON.stringify(bike);
    return this.httpClient.post(bikesApiUrl, body, httpOptions);
  }

  public getBikeModels() {
    return this.httpClient.get(`${bikesApiUrl}/models`);
  }
}
