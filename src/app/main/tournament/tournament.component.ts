import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { TournamentService } from './services/tournament.service';
import { TournamentType } from './model/TournamentType';
import { Tournament } from './model/Tournament';
import { TournamentFactory } from './model/TournamentFactory';
import { EnumConverter } from '../utilities/EnumConverter';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  private _paramID;
  private _enumConverter: EnumConverter;
  private _tournament: Tournament;
  private _tournamentFactory: TournamentFactory;

  constructor(private _tournamentService: TournamentService,
                private _activatedRoute: ActivatedRoute) { 
    this._tournamentFactory = new TournamentFactory();
    this._enumConverter = new EnumConverter();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];
    })

    this._tournamentService.getTournament(this._paramID).subscribe(parentTournament => {
      this.getAllTournamentInfo(parentTournament);
    });
  }

  getAllTournamentInfo(parentTournament) {
    let type = this._enumConverter.tournamentTypeToEnum("" + parentTournament.type);
    this._tournamentService.getAllTournamentInfo(type, parentTournament._id).subscribe(childTournament => {
      this._tournament = this._tournamentFactory.createTournament(parentTournament, childTournament, type);
      console.log(this._tournament);
    });
  }
}
