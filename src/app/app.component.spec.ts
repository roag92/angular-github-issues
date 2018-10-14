import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-auth',
  template: `AuthComponent`
})
export class AuthComponent { }

@Component({
  selector: 'app-dashboard',
  template: `DashboardComponent`
})
export class DashboardComponent { }

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
];

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        AppComponent,
        AuthComponent,
        DashboardComponent
      ],
      imports: [
        MatToolbarModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    authService = TestBed.get(AuthService);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should create the app component', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should has the app-header tag', async(() => {
    fixture.detectChanges();
    const header = fixture.debugElement.componentInstance;
    const element = fixture.debugElement.query(By.css('app-header'));
    expect(element).toBeTruthy();
  }));

  it('should call the method authService.checkStatus()', async(() => {
    spyOn<AuthService>(authService, 'checkStatus');
    app.ngOnInit();
    expect(authService.checkStatus).toHaveBeenCalled();
  }));

  it('should subscribe for change status (authService.statusChanged)', async(() => {
    spyOn(authService.statusChanged, 'subscribe');
    app.ngOnInit();
    expect(authService.statusChanged.subscribe).toHaveBeenCalled();
  }));

  it('should navigate to auth component (/auth)', fakeAsync(() => {
    router.navigate(['/auth']);
    tick(50);
    fixture.detectChanges();
    expect(location.path()).toBe('/auth');
    const element = fixture.debugElement.query(By.css('app-auth'));
    expect(element).toBeTruthy();
  }));

  it('should navigate to dashboard component (/dashboard)', fakeAsync(() => {
    router.navigate(['/dashboard']);
    tick(50);
    fixture.detectChanges();
    expect(location.path()).toBe('/dashboard');
    const element = fixture.debugElement.query(By.css('app-dashboard'));
    expect(element).toBeTruthy();
  }));

});
