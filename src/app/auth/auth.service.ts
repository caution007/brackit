import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure the Auth0 lock //
  private _lock = new Auth0Lock('3Oozr1NYspJYRuuJIUQDFDYsnjnS0OyG', 'iwangb.eu.auth0.com', {
    theme: {
      logo: 'assets/img/brackit.png',
      primaryColor: '#18BC9C'
    },
    languageDictionary: {
      emailInputPlaceholder: 'something@youremail.com',
      title: 'Brackit'
    }, 
    // auth: { 
    //   redirect: false 
    // }
  }); 

  constructor(private _router: Router) {
    // Adds a callback for the Auth0s lock authenticated event //
    this._lock.on('authenticated', (authResult) => {
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

  // Function that shows the Auth0 widget //
  public login() {
    this._lock.show();
  }

  // Checks to see if there is an unexpired JWT, this search for an item //
  // in localStorage with the key of id_token //
  public authenticated() {
    return tokenNotExpired();
  }

  // Removes token and given profile from storage //
  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this._router.navigate(['frontpage']);
    location.reload();
  }

}