import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/share';

import { TournamentService } from '../../tournament/services/tournament.service';
import { Tournament } from '../../tournament/model/Tournament';
import { CompetitorType } from '../../tournament/model/CompetitorType';
import { FixtureSortType } from '../../tournament/model/FixtureSortType';
import { RegistrationType } from '../../tournament/model/RegistrationType';
import { TournamentType } from '../../tournament/model/TournamentType';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {

  private _user;
  private _profile;
  private _types = ['Round Robin'];
  private _registrationTypes = ['List', 'Signup'];
  private _fixtureSortTypes = ['Random', 'Seeded'];
  private _competitorTypes = ['User', 'Team'];
  private _yesNoChoices = [['Yes', true], ['No', false]];
  private _matchTypes = ['bo1', 'bo3', 'bo5'];

  private _name;
  private _type;
  private _registrationType;
  private _lstTeams;
  private _fixtureSortType;
  private _competitorType;
  private _includeDraws = false;
  private _startDate;
  private _startTime;
  private _matchType;
  private _information;
  private _rules;
  private _owner;

  private _createMsg = '';

  private _fixtureSub;

  constructor(private _tournamentService: TournamentService, 
                private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this._profileService.getProfile(this._user.user_id).subscribe(profile => {
      if (profile.length == 1) {
        this._profile = profile[0];
      }
      this._owner = this._profile._id;
    });
  }

  createTournament() {
    if(this.nameCheck() && 
      this._type && 
      this._registrationType &&
      this._fixtureSortType &&
      this._competitorType &&
      this._includeDraws &&
      this._startDate &&
      this._startTime &&
      this._matchType &&
      this._information &&
      this._rules &&
      this._owner) {
        console.log(this.makeTournament());
        this._tournamentService.createTournament(this.makeTournament()).subscribe(() => {})
        this._createMsg = '';
    } else {
      console.log(this.makeTournament());
      this._createMsg = 'na mate';
    }
  }

  nameCheck() {
    let boolean = false;

    if(this._name) {
      boolean = true;
    }

    return boolean;
  }

  makeTournament() {
    let tournament = [
      this._name, 
      this._type, 
      this._registrationType, 
      this._fixtureSortType,
      this._competitorType,
      this._includeDraws,
      this._startDate,
      this._startTime,
      this._matchType,
      this._information,
      this._rules,
      this._owner
    ];

    if (this._registrationType == 'List') {
      tournament.push(this._lstTeams);
    } else {
      tournament.push([]);
    }

    return tournament;
  }

  fixtureTest() {
    this._fixtureSub = this._tournamentService.createFixtures('58d4445343db91243c132bf1', ['Iwan', 'Alfie'], 'Round Robin', 'bo1')
      .subscribe(result => {
        if (result.status == 'success') {
          this._fixtureSub.unsubscribe();
        }
      });
  }

  test() {
    console.log(this._startDate);
    console.log(this._startTime);
    console.log(this._lstTeams);
    this.createTournament();
  }

}
