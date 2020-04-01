import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  public pageContent = {
    header: {
      title: 'Create a new account',
      strapLine: ''
    },
    sidebar: ''
  };
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService) { }

  ngOnInit(): void {
  }

  public onRegisterSubmit(): void {
    this.formError = '';
    if(!this.credentials.name.length || !this.credentials.email.length || !this.credentials.password.length){
      this.formError = 'All fields are required.'
    }
    else {
      this.doRegister();
    }
  }

  public doRegister(): void {
    this.authenticationService.register(this.credentials)
    .then(() => this.router.navigateByUrl(this.historyService.getLastNonLoginUrl()))
    .catch((message) => this.formError = message);
  }

}
