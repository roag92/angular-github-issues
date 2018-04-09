import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private statusLogged: string;
  private user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.statusLogged = this.authService.status;
    this.verifyUser();
    this.authService.statusChanged.subscribe((status: string) => {
      this.statusLogged = status;
      this.verifyUser();
    });
  }

  logOutUser() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  verifyUser() {
    if (this.statusLogged === 'Logged') {
      this.user = this.authService.user;
    } else {
      this.user = new User();
    }
  }

}
