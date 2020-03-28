import { Component, OnInit } from '@angular/core';
import { Location} from '../interfaces/locations';
import { LocationService } from '../services/location.service';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  public locations: Array<Location>;
  public message: string;

  constructor(private locationService: LocationService, 
    private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    // this.getPosition();
    this.getLocations();
  }

  public getLocations(): void { // positions: any
    this.message = 'Searching for nearby places';
    // const lat: number = position.coords.latitude;
    // const lng: number = position.coords.longitude;
    const lat: number = 50.999;
    const lng: number =  11.0528;
    this.locationService
      .getLocations(lat, lng)
      .then(foundLocations => {
        this.message = foundLocations.length > 0 ? '' : 'No locations found';
        this.locations = foundLocations
      });
  }

  private showError(error: any){
    this.message = error.message;
  }

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  }

  private getPosition(): void {
    this.message = 'Getting your location...';
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

}
