import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private subscription: Subscription;
  public statusLogged: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkStatus();
    this.statusLogged = this.authService.status;
    this.subscription = this.authService.statusChanged.subscribe((status: string) => {
      this.statusLogged = status;
    });
  }

}
