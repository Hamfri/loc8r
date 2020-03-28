import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location, Review } from '../interfaces/locations';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private readonly apiUrl: string =  environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getLocations(lat: number, lng: number): Promise<Location[]>{
    const maxDistance: number = 20;
    const url: string = `${this.apiUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Array<Location>)
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location>{
    const url: string = `${this.apiUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError);
  }

  public addReviewByLocation(LocationId: string, formData: Review): Promise<Review>{
    const url: string = `${this.apiUrl}/locations/${LocationId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
