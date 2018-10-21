import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let fixture: ComponentFixture<AuthComponent>;
  let auth: AuthComponent;

  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    auth = fixture.debugElement.componentInstance;
    authService = TestBed.get(AuthService);
  }));

  afterEach(() => {
    document.body.removeChild(fixture.debugElement.nativeElement);
  });

  it('should create the auth component', async(() => {
    expect(auth).toBeTruthy();
  }));

  it('should login when the button has been clicked', async(() => {
    authService.status = 'None';
    fixture.detectChanges();
    spyOn(authService, 'signinUser').and.callFake(() => {
      authService.status = 'WaitingRedirectResult';
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('button#login'));
      expect(element).toBeNull();
    });
    const button = fixture.debugElement.nativeElement.querySelector('button#login');
    button.click();
  }));

  it('should hide the button login when the app is waiting for user data', async(() => {
    authService.status = 'WaitingRedirectResult';
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('button#login'));
    expect(element).toBeNull();
  }));
});
