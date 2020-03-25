import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location } from '../interfaces/locations';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private readonly apiUrl: string =  environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getLocations(): Promise<Location[]>{
    const lng: number = 11.0528;
    const lat: number = 50.999;
    const maxDistance: number = 20;
    const url: string = `${this.apiUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Array<Location>)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
