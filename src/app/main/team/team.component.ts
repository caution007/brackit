import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../../auth/auth.service';
import { Team } from './model/Team';
import { TeamService } from './services/team.service';
import { ProfileService } from '../profile/services/profile.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private _paramID;
  private _user;
  private _profile;
  private _team: Team;
  private _inTeam = false;

  private _joinPassword;

  constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute,
                  private _teamService: TeamService,
                    private _auth: Auth,
                      private _profileService: ProfileService) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];
    })

    if (this._auth.authenticated()) {
      this._profileService.getProfile(this._user.user_id).subscribe(profile => {
        if (profile.length == 1) {
          this._profile = profile[0];
        }
      });
    }

    this._teamService.getTeam(this._paramID).subscribe(team => {
      this._team = new Team(team._id, team.name, team.members, team.tournaments);
      console.log(team);
      if(this._auth.authenticated) {
        for (let i = 0; i < this._team.getMembers().length; i++) {
         if(this._team.getMembers()[i].username == this._user.username) {
          this._inTeam = true;
         }
        }
      }
    })
  }

  joinTournamentPlayer() {
    this._teamService.joinTeam(this._team.getId(), this._profile._id, this._profile.username, this._joinPassword)
      .subscribe(result => {
        console.log(result);
      })
  }

  navToPlayer(selectedPlayerID) {
    this._router.navigate(['/profile', selectedPlayerID]);
  }

}
