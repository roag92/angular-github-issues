import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private showLogIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.showLogIn = this.authService.status !== 'WaitingRedirectResult';
  }

  private onSignIn(): void {
    this.showLogIn = false;
    this.authService.signinUser();
  }
}
