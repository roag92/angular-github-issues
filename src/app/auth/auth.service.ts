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

  /**
   * Method to call the firebase API to do the Github's OAuth
   */
  signinUser() {
    const githubAuthProvider = new firebase.auth.GithubAuthProvider();
    githubAuthProvider.addScope('user,public_repo');
    firebase.auth().signInWithRedirect(githubAuthProvider);
    this.setStatus('WaitingRedirectResult');
  }

  /**
   * Checks the status to read the session in localStorage or trigger the getRedirectResult
   */
  checkStatus() {
    this.status = this.getStatus();
    if (this.status === 'WaitingRedirectResult') {
      this.getRedirectResult();
    } else {
      this.readAuth();
    }
  }

  /**
   * Exit of application
   */
  logout() {
    this.credential = new Credential('', '', '');
    this.user = new User();
    this.clearLocalStorage();
    this.setStatus('None');
    this.navigate('/auth');
  }

  /**
   * Get the accessToken (used in HTTP Requests)
   * @returns {string}
   */
  getToken() {
    return this.credential.accessToken;
  }

  /**
   * Method to know if exists a session
   * @returns {boolean}
   */
  isAuthenticated() {
    return (this.credential.accessToken !== '');
  }


  /**
   * This method is called when the app is waiting for the result of OAuth
   */
  private getRedirectResult() {
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

  /**
   * Recover the data session from localstorage
   */
  private readAuth() {
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

  /**
   * Set the status in localstorage
   * @param status {string}
   */
  private setStatus(status: string) {
    if (this.status !== status) {
      this.status = status;
      this.statusChanged.next(status);
    }
    localStorage.setItem('status', status);
  }

  /**
   * Get the status from localstorage
   * @returns {string}
   */
  private getStatus(): string {
    return localStorage.getItem('status');
  }

  /**
   * Set the auth data in localstorage
   * @param auth {Auth}
   */
  private setAuth(auth: Auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  /**
   * Get the auth data from localstorage
   * @returns {Auth|null}
   */
  private getAuth() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth !== null) {
      return <Auth>auth;
    }
    return auth;
  }

  /**
   * Get the flag to redirect
   * @returns {string}
   */
  private getRedirect() {
    return localStorage.getItem('redirect');
  }

  /**
   * Remove the redirect value from localstorage
   */
  private removeRedirect() {
    localStorage.removeItem('redirect');
  }

  /**
   * Remove all data in localstorage
   */
  private clearLocalStorage() {
    localStorage.clear();
  }

  /**
   * Trigger the navigate routing
   */
  private navigate(state: string) {
    this.router.navigate([state]);
  }

}
