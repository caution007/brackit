import { Component, OnInit, OnDestroy } from '@angular/core';

import { TournamentService } from '../../tournament/services/tournament.service';
import { Tournament } from '../../tournament/model/Tournament';
import { CompetitorType } from '../../tournament/model/CompetitorType';
import { FixtureSortType } from '../../tournament/model/FixtureSortType';
import { RegistrationType } from '../../tournament/model/RegistrationType';
import { TournamentType } from '../../tournament/model/TournamentType';
import { ProfileService } from '../services/profile.service';
import { Games } from '../../tournament/model/Games';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {
  private _games: Games;
  private _gameList;
  private _selectedGame;

  private _user;
  private _profile;
  private _types = ['Round Robin'];
  private _registrationTypes = ['List', 'Signup'];
  private _fixtureSortTypes = ['Random'];
  private _competitorTypes = ['User', 'Team'];
  private _yesNoChoices = [['Yes', true], ['No', false]];
  private _matchTypes = ['bo1'];
  private _gameChoices = [['Choose your own', true], ['Search for supported game', false]];
  private _gameChoice;

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
  private _information = '';
  private _rules = '';
  private _owner;
  private _teamLimit;
  private _fixtureInterval;
  private _game;
  private _points = {win: '', draw: ''};

  private _createMsg = '';

  private _fixtureSub;
  private _createTournSub;

  // ALERTS //
  private _nameAlert = true;
  private _typeAlert = true;
  private _registrationTypeAlert = true;
  private _fixtureSortTypeAlert = true;
  private _competitorTypeAlert = true;
  private _includeDrawsAlert = true;
  private _startDateAlert = true;
  private _startTimeAlert = true;
  private _matchTypeAlert = true;
  private _informationAlert = true;
  private _rulesAlert = true;
  private _ownerAlert = true;
  private _teamLimitAlert = true;
  private _fixtureIntervalAlert = true;
  private _gameAlert = true;
  private _pointsWinAlert = true;
  private _pointsDrawAlert = true;

  constructor(private _tournamentService: TournamentService, 
                private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
    this._games = new Games();
  }

  ngOnInit() {
    this._gameList = this._games.getGameList();
    console.log(this._gameList);
    this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
      if (profile.profile.length == 1) {
        this._profile = profile.profile[0];
      }
      this._owner = this._profile._id;
    });
  }

  gameSelected(game) {
    this._game = game ? game.name : '';
  }

  createTournament() {
    let checks = 18;
    let count = 0;

    for (let i = 0; i < checks; i ++) {
      if(this.createTournamentChecks(i)) {
        count++;
      } 
    }

    if(count == checks) {
      console.log(this.makeTournament());
        this._createTournSub = this._tournamentService.createTournament(this.makeTournament()).subscribe(result => {
          if(result.status == 'success') {
            this._createTournSub.unsubscribe();
          }
        })
    }
  }

  createTournamentChecks(check) {
    let boolean;
    switch(check) {
      case 0:
        boolean = this.booleanCheckReturn(this.nameCheck());
        this._nameAlert = boolean;
        break;
      case 1:
        boolean = this.booleanCheckReturn(this._type);
        this._typeAlert = boolean;
        break;
      case 2:
        boolean = this.booleanCheckReturn(this._registrationType);
        this._registrationTypeAlert = boolean;
        break;
      case 3:
        boolean = this.booleanCheckReturn(this._fixtureSortType);
        this._fixtureSortTypeAlert = boolean;
        break;
      case 5:
        boolean = this.booleanCheckReturn(this._competitorType);
        this._competitorTypeAlert = boolean;
        break;
      case 6:
        boolean = this.booleanCheckReturn(this._includeDraws);
        this._includeDrawsAlert = boolean;
        break;
      case 7:
        boolean = this.booleanCheckReturn(this._startDate);
        this._startDateAlert = boolean;
        break;
      case 8:
        boolean = this.booleanCheckReturn(this._startTime);
        this._startTimeAlert = boolean;
        break;
      case 9:
        boolean = this.booleanCheckReturn(this._matchType);
        this._matchTypeAlert = boolean;
        break;
      case 10:
        boolean = this.booleanCheckReturn(this._information);
        this._informationAlert = boolean;
        break;
      case 11:
        boolean = this.booleanCheckReturn(this._rules);
        this._rulesAlert = boolean;
        break;
      case 12:
        boolean = this.booleanCheckReturn(this._owner);
        this._ownerAlert = boolean;
        break;
      case 13:
        boolean = this.booleanCheckReturn(this.checkIfEven(this._teamLimit));
        this._teamLimitAlert = boolean;
        break;
      case 14:
        boolean = this.booleanCheckReturn(this._fixtureInterval);
        this._fixtureIntervalAlert = boolean;
        break;
      case 15:
        boolean = this.booleanCheckReturn(this._game);
        this._gameAlert = boolean;
        break;
      case 16:
        boolean = this.booleanCheckReturn(this._points.win);
        this._pointsWinAlert = boolean;
        break;
      case 17:
        boolean = this.booleanCheckReturn(this.checkIfDraw());
        this._pointsDrawAlert= boolean;
        break;
    }
    return boolean;
  }

  booleanCheckReturn(check) {
    if(check) {
      return true;
    } else {
      return false;
    }
  }

  checkIfDraw() {
    let boolean = false;

    if(this._includeDraws[1]) {
      if(this._points.draw) {
        boolean = true;
      }
    } else if (!this._includeDraws[1]) {
      this._points.draw = '';
      boolean = true;
    }

    return boolean;
  }

  checkIfEven(check) {
    let boolean = false;

    if(check % 2 == 0) {
      boolean = true;
    }

    return boolean;
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
      this._includeDraws[1],
      this._startDate,
      this._startTime,
      this._matchType,
      this._information,
      this._rules,
      this._owner,
      this._teamLimit,
      this._fixtureInterval,
      this._game,
      this._points
    ];

    if (this._registrationType == 'List') {
      tournament.push(this._lstTeams);
    } else {
      tournament.push([]);
    }

    return tournament;
  }

  test() {
    console.log(this._startDate);
    console.log(this._startTime);
    console.log(this._lstTeams);
    this.createTournament();
    console.log(this._nameAlert);
    console.log(this._type);
  }

}
