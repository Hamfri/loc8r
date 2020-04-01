import { Inject, Injectable } from '@angular/core';
import { BrowserStorage } from '../storage';

import { LocationService } from './location.service';
import { User } from '../interfaces/user'
import { AuthResponse } from '../interfaces/auth-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly apiUrl: string =  environment.apiUrl;

  constructor(@Inject(BrowserStorage) private storage: Storage, 
  private locationService: LocationService) { }

  public getToken(): string {
    return this.storage.getItem('token');
  }

  public saveToken(token: string): void{
    this.storage.setItem('token',token);
  }

  public login(user: User): Promise<any>{
    return this.locationService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public register(user: User){
    return this.locationService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void{
    this.storage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if(token){
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    else {
      return false;
    }
  }

  public getCurrentUser() : User{
    if(this.isLoggedIn()){
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
  }
}
