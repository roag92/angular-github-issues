import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private addingMode = false;
  private routingEvent: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.addingMode = (this.router.url.indexOf('new') !== -1);
    this.routingEvent = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.addingMode = (event.url.indexOf('new') !== -1);
      }
    });
  }

  ngOnDestroy() {
    this.routingEvent.unsubscribe();
  }

}
