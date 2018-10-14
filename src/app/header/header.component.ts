import { Component, Input, OnChanges } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges {

  private statusLogged: string;
  private user: User;

  @Input()
  set status(statusName: string) {
    this.statusLogged = (statusName && statusName.trim()) || 'None';
    this.verifyUser();
  }

  constructor(private authService: AuthService) { }

  ngOnChanges(changes): void {
    this.verifyUser();
  }

  private logOutUser(): void {
    this.authService.logout();
  }

  private verifyUser(): void {
    if (this.statusLogged === 'Logged') {
      this.user = this.authService.user;
    } else {
      this.user = new User();
    }
  }

}
