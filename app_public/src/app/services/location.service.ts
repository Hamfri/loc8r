import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Location, Review } from '../interfaces/locations';
import { User } from '../interfaces/user';
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '../../environments/environment';
import { BrowserStorage } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private readonly apiUrl: string =  environment.apiUrl;
  constructor(@Inject(BrowserStorage) private storage: Storage, private http: HttpClient) {}

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('token')}`
      })
    };
    return this.http
      .post(url, formData,  httpOptions)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse>{
    return this.makeAuthApiCall('authentication/login', user);
  }

  public register(user: User): Promise<AuthResponse>{
    return this.makeAuthApiCall('authentication/register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse>{
    const url: string = `${this.apiUrl}/${urlPath}`; 
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
