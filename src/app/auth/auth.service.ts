import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

import { User, Credential, Auth } from './auth.model';

@Injectable()
export class AuthService {

  private credential: Credential = new Credential('', '', '');
  public user: User;
  public status = 'None';

  public statusChanged = new Subject<string>();

  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone) { }

  signinUser(): void {
    const githubAuthProvider = new firebase.auth.GithubAuthProvider();
    githubAuthProvider.addScope('user,public_repo');
    firebase.auth().signInWithRedirect(githubAuthProvider);
    this.setStatus('WaitingRedirectResult');
  }

  checkStatus(): void {
    this.status = this.getStatus();
    if (this.status === 'WaitingRedirectResult') {
      this.getRedirectResult();
    } else {
      this.readAuth();
    }
  }

  logout(): void {
    this.credential = new Credential('', '', '');
    this.user = new User();
    this.clearLocalStorage();
    this.setStatus('None');
    this.navigate('/auth');
  }

  getToken(): string {
    return this.credential.accessToken;
  }

  isAuthenticated(): boolean {
    return (this.credential.accessToken !== '');
  }

  private getRedirectResult(): void {
    firebase.auth().getRedirectResult().then((result: any) => {
      if (result.credential) {
        this.credential = <Credential>result.credential;
        this.user = <User>{
          avatar_url: result.additionalUserInfo.profile.avatar_url,
          email: result.additionalUserInfo.profile.email,
          location: result.additionalUserInfo.profile.location,
          name: result.additionalUserInfo.profile.name,
          username: result.additionalUserInfo.username
        };
        this.setAuth(<Auth>{ credential: this.credential, user: this.user });
        this.setStatus('Logged');
        this.zone.run(() => {
          this.navigate('/dashboard');
        });
      } else {
        this.setStatus('None');
      }
    }).catch((err) => {
      this.setStatus('None');
      console.log(err);
    });
  }

  private readAuth(): void {
    const auth: any = this.getAuth();
    this.status = this.getStatus();
    if (auth !== null) {
      this.credential = auth.credential;
      this.user = auth.user;
      this.setStatus('Logged');
      if (this.getRedirect() === 'true') {
        this.removeRedirect();
        this.navigate('/dashboard');
      }
    } else {
      this.setStatus('None');
    }
  }

  private setStatus(status: string): void {
    if (this.status !== status) {
      this.status = status;
      this.statusChanged.next(status);
    }
    localStorage.setItem('status', status);
  }

  private getStatus(): string {
    return localStorage.getItem('status');
  }

  private setAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  private getAuth(): Auth|null {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      return <Auth>auth;
    }
    return auth;
  }

  private getRedirect(): string {
    return localStorage.getItem('redirect');
  }

  private removeRedirect(): void {
    localStorage.removeItem('redirect');
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  private navigate(state: string): void {
    this.router.navigate([state]);
  }

}
