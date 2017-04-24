import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../../auth/auth.service';
import { ProfileService } from '../profile/services/profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private _user;

  constructor(private _auth: Auth, 
                private _profileService: ProfileService,
                  private _router: Router) {}

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  logout() {
    this._user = null;
  }
}
