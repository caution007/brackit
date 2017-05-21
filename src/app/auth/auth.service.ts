import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  private _lock = new Auth0Lock('3Oozr1NYspJYRuuJIUQDFDYsnjnS0OyG', 'iwangb.eu.auth0.com', {
    theme: {
      logo: 'assets/img/brackit.png',
      primaryColor: '#18BC9C'
    },
    languageDictionary: {
      emailInputPlaceholder: "something@youremail.com",
      title: "Brackit"
    }, 
    // auth: { 
    //   redirect: false 
    // }
  }); 

  constructor(private _router: Router) {
    // Add callback for lock `authenticated` event
    this._lock.on("authenticated", (authResult) => {
      this._lock.getProfile(authResult.idToken, function(error, profile) {
        if(error) {
            throw new Error(error);
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        _router.navigate(['profile']);
        location.reload();
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this._lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this._router.navigate(['frontpage']);
    location.reload();
  }

}