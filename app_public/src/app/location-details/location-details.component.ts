import { Component, OnInit, Input } from '@angular/core';
import { Location, Review } from '../interfaces/locations';

import { environment } from '../../environments/environment';
import { LocationService } from '../services/location.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;
  public mapsApiKey: string = environment.mapsApiKey;
  public formVisible: boolean = false;
  public formError: string;

  public newReview: Review = {
    author: '',
    rating: 0,
    reviewText: ''
  };

  constructor(private locationService: LocationService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  private formIsValid(): boolean {
    if(this.newReview.rating && this.newReview.reviewText.length){
      return true;
    }
    else{
      return false;
    }
  }

  private resetAndHideReviewForm(): void{
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 0;
    this.newReview.reviewText = '';
  }

  public onReviewSubmit(): void {
    this.formError = '';
    if(this.formIsValid()){
      this.locationService.addReviewByLocation(this.location._id, this.newReview)
      .then((review: Review) => {
        console.log('Review saved', review);
        let reviews = this.location.reviews.slice(0);
        reviews.unshift(review);
        this.location.reviews = reviews;
        this.resetAndHideReviewForm();
      });
    }
    else{
      this.formError = 'All fields are required, please try again';
    }
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }

}
