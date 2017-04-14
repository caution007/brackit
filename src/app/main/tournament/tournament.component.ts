import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../../auth/auth.service';
import { TournamentService } from './services/tournament.service';
import { TournamentType } from './model/TournamentType';
import { RegistrationType } from './model/RegistrationType';
import { CompetitorType } from './model/CompetitorType';
import { Tournament } from './model/Tournament';
import { TournamentFactory } from './model/TournamentFactory';
import { EnumConverter } from '../utilities/EnumConverter';
import { ProfileService } from '../profile/services/profile.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  private _user;
  private _profile;

  private _paramID;
  private _enumConverter: EnumConverter;
  private _tournament: Tournament;
  private _tournamentFactory: TournamentFactory;

  private _teams;
  private _players;
  private _standings;
  private _inTournament = false;

  constructor(private _tournamentService: TournamentService,
                private _activatedRoute: ActivatedRoute,
    private _auth: Auth,
    private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
    this._tournamentFactory = new TournamentFactory();
    this._enumConverter = new EnumConverter();
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

    this._tournamentService.getTournament(this._paramID).subscribe(parentTournament => {
      this.getAllTournamentInfo(parentTournament);
    });

  }

  getAllTournamentInfo(parentTournament) {
    let type = this._enumConverter.tournamentTypeToEnum("" + parentTournament.type);
    this._tournamentService.getAllTournamentInfo(type, parentTournament._id).subscribe(childTournament => {
      this._tournament = this._tournamentFactory.createTournament(parentTournament, childTournament, type);
      console.log(this._tournament);

      if (this._tournament.getTeams().length != 0) {
        this._standings = this._tournament.getStandings()
      }

      if (this._auth.authenticated()) {
        if (this._tournament.getRegistrationType() == RegistrationType.SIGNUP) {
          if (this._tournament.getCompetitorType() == CompetitorType.TEAM) {
            this._tournamentService.getTeamsAndPlayers(this._tournament.getId()).subscribe(teams => {
              this._teams = teams;
              console.log(teams);
              this.checkIfInTournamentTeams();
            })
          } else if (this._tournament.getCompetitorType() == CompetitorType.USER) {
            this._tournamentService.getPlayers(this._tournament.getId()).subscribe(players => {
              this._players = players;
              console.log(players);
              this.checkIfInTournamentUsers();
            })
          }

        }
      }
    });
  }

  checkIfInTournamentTeams() {
    for (let i = 0; i < this._teams.length; i++) {
      for (let l = 0; i < this._teams[i].members.length; i++) {
        if (this._teams[i].members[l].id == this._profile._id) {
          this._inTournament = true;
          console.log(this._inTournament);
          break;
        }
      }
    }
  }

  checkIfInTournamentUsers() {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i]._id == this._profile._id) {
        this._inTournament = true;
        console.log(this._inTournament);
        break;
      }
    }
  }

  joinTournamentPlayer() {
    this._tournamentService.joinTournament(this._tournament.getId(),
      this._tournament.getType(),
      this._profile._id,
      this._user.username)
      .subscribe(result => {
        console.log(result);
      })
  }

  joinTournamentTeam() {

  }

}
