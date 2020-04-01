import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './interfaces/user';
import { HistoryService } from './services/history.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private authenticationService: AuthenticationService,
        private historyService: HistoryService){}

    public doLogout(): void{
        this.authenticationService.logout();
    }

    public isLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn();
    }

    public getUsername() : string{
        const user: User = this.authenticationService.getCurrentUser();
        return user ? user.name : 'Guest';
    }
}