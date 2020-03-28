import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { LocationService } from '../services/location.service';
import { Location } from '../interfaces/locations';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  public location: Location;

  constructor(private locationService: LocationService, 
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('locationId');
        return this.locationService.getLocationById(id);
      })
    )
    .subscribe((location: Location) => {
      this.location = location;
      this.pageContent.header.title = location.name;
      this.pageContent.sidebar = `${location.name} is on Loc8r because it has accessible wifi and space. The next level
          to sit down with your laptop and get some work done. \n If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.`
    });
  }

  public pageContent = {
    header: {
      title: '',
      strapLine: ''
    },
    sidebar: ''
  }

}
