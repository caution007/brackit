import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';

import { ProfileService } from '../services/profile.service';
import { TeamService } from '../../team/services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  private _user;
  private _profile;

  private _name;
  private _joinPassword;
  private _owner;

  private _createTeamSub;

  constructor(private _profileService: ProfileService,
                private _teamService: TeamService) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
      if (profile.profile.length == 1) {
        this._profile = profile.profile[0];
      }
      this._owner = this._profile._id;
    });
  }

  createTeam() {
    let team = {name: this._name, joinPassword: this._joinPassword, owner: this._owner, ownerName: this._user.username};
    console.log(team);

    this._createTeamSub = this._teamService.createteam(team).subscribe(result => {
      if (result.status == 'success') {
          this._createTeamSub.unsubscribe();
        }
    })
  }

  generatePassword() {
    let pw = UUID.UUID();
    pw = pw.substring(0, 8);
    this._joinPassword = pw;
  }

}
