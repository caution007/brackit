import { Component, OnInit } from '@angular/core';

import { PanelService } from '../services/panel.service';
import { TournamentService } from '../../tournament/services/tournament.service';
import { EnumConverter } from '../../utilities/EnumConverter';

@Component({
  selector: 'app-edit-tournament',
  templateUrl: './edit-tournament.component.html',
  styleUrls: ['./edit-tournament.component.css']
})
export class EditTournamentComponent implements OnInit {

  private _enumConverter: EnumConverter;

  private _trueFalse = [true, false];

  private _tournament;
  private _tournamentType;
  private _matches;
  private _dateTime;

  private _scoreOne;
  private _scoreTwo;

  private _getMatchesSub;
  private _submitResultSub;
  private _editTournSub;

  constructor(private _panelService: PanelService,
                private _tournamentService: TournamentService) { 
    this._enumConverter = new EnumConverter(); 
  }

  ngOnInit() {
    let id = this._panelService.getSelectedId();
    this._tournamentService.getTournament(id).subscribe(parentTournament => {
      this._tournament = parentTournament;
      this.getTournamentType(parentTournament.type, parentTournament._id);
      if (this._tournament.started) {
        this.getMatches(parentTournament._id);
      }
    });
  }

  getMatches(id) {
    console.log('hello');
    this._getMatchesSub = this._tournamentService.getMatches(id).subscribe(result => {
      this._matches = result.matches;
      console.log(this._matches);

      if (result.status == 'success') {
        this._getMatchesSub.unsubscribe();
      }

    })
  }

  getTournamentType(type, id) {
    this._tournamentService.getAllTournamentInfo(
        this._enumConverter.tournamentTypeToEnum(type), 
        id).subscribe(childTournament => {
          this._tournamentType = childTournament;
          this._dateTime = this._tournament.start.slice(0, -5);
          console.log(this._dateTime);
          console.log(this._tournament);
          console.log(this._tournamentType);
        });
  }

  editTournament(tournament) {
    if(confirm("Are you sure you want to edit the tournament?")) {
      this._editTournSub = this._tournamentService.updateTournament(tournament).subscribe(result => {
        if (result.status == 'success') {
          this._editTournSub.unsubscribe();
        }
      })
    }
  }

  submitResult(
    scoreOne, scoreTwo, matchTypeId, participantOneName, participantOneId, participantTwoName, participantTwoId) {
    this._submitResultSub = this._tournamentService.submitResult(
      scoreOne, 
      scoreTwo, 
      matchTypeId,
      this._tournament._id,
      this._tournament.includeDraws,
      this._tournament.registrationType,
      this._tournament.matchType,
      null,
      this._tournament.points,
      [{
        name: participantOneName,
        id: participantOneId
      },
      {
        name: participantTwoName,
        id: participantTwoId
      }
      ]).subscribe(result => {
        if(result.status == 'success') {
          this._submitResultSub.unsubscribe();
          location.reload();
        }
      })
  }
}
