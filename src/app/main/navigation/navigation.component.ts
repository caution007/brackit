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

  private _profile;

  constructor(private _auth: Auth, 
                private _profileService: ProfileService) {}

  ngOnInit() {
    this._profile = JSON.parse(localStorage.getItem('profile'));
  }
}
