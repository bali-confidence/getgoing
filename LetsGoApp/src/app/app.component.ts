import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LetsGoApp';
  authStatus;

  constructor(private _authService: AuthService) {
    this.authStatus = this.getAuthStatus();
  }

  ngOnInit () {
    this.authStatus = this.getAuthStatus();
  }

  getAuthStatus() {
    console.log('is this getting ran', this._authService.loggedIn())
    return this._authService.loggedIn();
  }

  logoutUser() {
    this._authService.logoutUser(); 
    this.authStatus = this.getAuthStatus();
    console.log('this is the current auth status', this.authStatus)
  }
}
