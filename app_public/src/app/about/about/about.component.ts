import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header: {
      title: 'About Loc8r',
      strapLine: ''
    },
    content: `Loc8r was created to help people find places to sit down and get a bit of work done.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed a, earum officiis voluptas cupiditate dolorum modi culpa voluptatibus! Corporis cum minima consequuntur aliquam laudantium alias inventore repellendus optio id laboriosam.
              \n\n Ab quaerat facere magnam asperiores, eveniet sed exercitationem ipsam modi voluptatibus nulla officiis dicta explicabo! Necessitatibus in ducimus rem, distinctio explicabo reprehenderit iste unde sed. Porro labore natus vitae distinctio?
              \n\n Reprehenderit molestiae harum culpa nemo illum totam quo ipsam dolore aliquid dignissimos accusantium dolor dicta neque earum animi nulla assumenda delectus a similique esse, rem voluptatum, autem blanditiis! Illo, nam?`
   };

}
