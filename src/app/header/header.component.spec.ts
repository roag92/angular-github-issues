import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material';

import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/auth.model';

describe('HeaderComponent', () => {

  let fixture: ComponentFixture<HeaderComponent>;
  let header: HeaderComponent;

  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        MatToolbarModule,
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    header = fixture.debugElement.componentInstance;
    authService = TestBed.get(AuthService);
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should create the header component', async(() => {
    expect(header).toBeTruthy();
  }));

  it('should show the register message in the toolbar', async(() => {
    header.status = 'None';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-toolbar-row > span'));
    expect(element.nativeElement.textContent.trim()).toBe('Please register you with a Github account!');
  }));

  it('should show message of proccessing session data in the toolbar', async(() => {
    header.status = 'WaitingRedirectResult';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-toolbar-row > span'));
    expect(element.nativeElement.textContent.trim()).toBe('Please wait we are proccessing your session data!');
  }));

  it('should show data of a logged user in the toolbar', async(() => {
    authService.user = <User>{
      'avatar_url': 'https://avatars1.githubusercontent.com/u/5541248?v=4',
      'email': 'ricardo.roman.ag@gmail.com',
      'location': 'México',
      'name': 'Ricardo Román',
      'username': 'roman92'
    };
    header.status = 'Logged';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('mat-toolbar-row > span'));
    expect(element.nativeElement.textContent.trim()).toBe(`Welcome, ${authService.user.username}`);
  }));

  it('should logout when an user was logged', async(() => {
    authService.user = <User>{
      'avatar_url': 'https://avatars1.githubusercontent.com/u/5541248?v=4',
      'email': 'ricardo.roman.ag@gmail.com',
      'location': 'México',
      'name': 'Ricardo Román',
      'username': 'roman92'
    };
    header.status = 'Logged';
    fixture.detectChanges();
    spyOn(authService, 'logout');
    const button = fixture.debugElement.nativeElement.querySelector('a#logout');
    button.click();
    expect(authService.logout).toHaveBeenCalled();
  }));

});
