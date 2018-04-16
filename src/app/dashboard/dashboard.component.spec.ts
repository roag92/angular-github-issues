import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { AuthService } from './../auth/auth.service';

@Component({
  template: `ListIssuesComponent`
})
export class ListIssuesComponent { }

@Component({
  template: `NewIssueComponent`
})
export class NewIssueComponent { }

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListIssuesComponent },
      { path: 'new', component: NewIssueComponent }
    ]
  }
];

describe('DashboardComponent', () => {

  let fixture: ComponentFixture<DashboardComponent>;
  let dashboard: DashboardComponent;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        ListIssuesComponent,
        NewIssueComponent
      ],
      imports: [
        MatIconModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [AuthService]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    dashboard = fixture.debugElement.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
  }));

  it('should create the header component', async(() => {
    expect(dashboard).toBeTruthy();
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should show the new issue button (/dashboard/list)', fakeAsync(() => {
    router.navigate(['/dashboard/list']);
    tick(50);
    expect(location.path()).toBe('/dashboard/list');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('div.row > button#new');
    expect(button).toBeTruthy();
  }));

  it('should show the list issues button (/dashboard/new)', fakeAsync(() => {
    router.navigate(['/dashboard/new']);
    tick(50);
    fixture.detectChanges();
    expect(location.path()).toBe('/dashboard/new');
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('div.row > button#list');
    expect(button).toBeTruthy();
  }));

});
