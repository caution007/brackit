import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../../auth/auth.service';
import { MatchService } from './services/match.service';
import { ProfileService } from '../profile/services/profile.service';
import { TournamentService } from '../tournament/services/tournament.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  private _paramID;
  private _user;
  private _profile;
  private _inMatch = false;
  private _owner = false;
  private _match;
  private _participentCheck;
  private _scoreOne;
  private _scoreTwo;

  // Subscriptions //
  private _submitResultSub;

  constructor(private _matchService: MatchService,
                private _profileService: ProfileService,
                  private _auth: Auth,
                   private _activatedRoute: ActivatedRoute,
                    private _router: Router,
                      private _tournamentService: TournamentService) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];
    })

    if (this._auth.authenticated()) {
      this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
        if (profile.profile.length == 1) {
          this._profile = profile.profile[0];
        }
      });
    }

    this._matchService.getMatch(this._paramID).subscribe(match => {
      this._match = match;
      console.log(this._match);
      if (this._auth.authenticated()) {
        this.inTournamentCheck();
      }
    })
  }

  private inTournamentCheck() {
    if(this._match.tournament.competitorType == 'Team') {
      for(let i = 0; i < this._match.teams.length; i++) {
        for(let l = 0; l < this._match.teams[i].members.length; l++) {
          if(this._match.teams[i].members[l].id == this._profile._id) {
            this._inMatch = true;
            this._participentCheck = i;
            console.log(this._participentCheck);
            console.log(this._inMatch);
            if(this._match.teams[i].members[l].role == 'owner') {
              this._owner = true;
              console.log(this._owner);
            }
          }
        }
      }
    } else if(this._match.tournament.competitorType == 'User') {
      for(let i = 0; i < this._match.matchType.partakers.length; i++) {
        if(this._match.matchType.partakers[i].id == this._profile._id) {
          this._inMatch = true;
          this._owner = true;
          this._participentCheck = i;
          console.log(this._participentCheck);
        }
      }
    }
  }

  submitResult() {
    this._submitResultSub = this._tournamentService.submitResult(
      this._scoreOne, 
      this._scoreTwo, 
      this._match.matchType._id,
      this._match.tournament._id,
      this._match.tournament.includeDraws,
      this._match.tournament.registrationType,
      this._match.match.type,
      this._participentCheck,
      this._match.tournament.points,
      [{
        name: this._match.matchType.partakers[0].name,
        id: this._match.matchType.partakers[0].id
      },
      {
        name: this._match.matchType.partakers[1].name,
        id: this._match.matchType.partakers[1].id
      }
      ]).subscribe(result => {
        if(result.status == 'success') {
          this._submitResultSub.unsubscribe();
          location.reload();
        }
      })
  }

  navToTeam(selectedTeamID) {
    this._router.navigate(['/team', selectedTeamID]);
  }

  navToPlayer(selectedPlayerID) {
    this._router.navigate(['/profile', selectedPlayerID]);
  }

}
