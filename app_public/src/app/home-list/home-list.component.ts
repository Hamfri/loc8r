import { Component, OnInit } from '@angular/core';
import { Location} from '../interfaces/locations';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  public locations: Array<Location>;
  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.getLocations();
  }

  public getLocations(): void {
    this.locationService
      .getLocations()
      .then(foundLocations => this.locations = foundLocations);
  }

}
