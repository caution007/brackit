import { Component, OnInit } from '@angular/core';

import { Auth } from '../../auth/auth.service';
import { ProfileService } from './services/profile.service';

import { ProfileMainComponent } from './profile-main/profile-main.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GameAccountsComponent } from './game-accounts/game-accounts.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { YourTournamentsComponent } from './your-tournaments/your-tournaments.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _user;
  private _panel;

  constructor(private profileService: ProfileService, private _auth: Auth) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
    console.log(this._user);
  }

  ngOnInit() {
    this._panel = ProfileMainComponent;
  }

  setProfileMainComponent() {
    this._panel = ProfileMainComponent;
  }

  setEditProfileComponent() {
    this._panel = EditProfileComponent;
  }

  setGameAccountsComponent() {
    this._panel = GameAccountsComponent;
  }

  setCreateTournamentComponent() {
    this._panel = CreateTournamentComponent;
  }

  setYourTournamentsComponent() {
    this._panel = YourTournamentsComponent;
  }

}
