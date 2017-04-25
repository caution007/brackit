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
  private _dateTime;

  constructor(private _panelService: PanelService,
                private _tournamentService: TournamentService) { 
    this._enumConverter = new EnumConverter(); 
  }

  ngOnInit() {
    let id = this._panelService.getSelectedId();
    this._tournamentService.getTournament(id).subscribe(parentTournament => {
      this._tournament = parentTournament;
      this._tournamentService.getAllTournamentInfo(
        this._enumConverter.tournamentTypeToEnum(parentTournament.type), 
        parentTournament._id).subscribe(childTournament => {
          this._tournamentType = childTournament;
          this._dateTime = this._tournament.start.slice(0, -5);
          console.log(this._dateTime);
          console.log(this._tournament);
          console.log(this._tournamentType);
        });
    });
  }

  startTournament() {
    if(confirm("Are you sure you want to start the tournament?")) {
      console.log("Implement delete functionality here");
    }
    console.log(this._tournament);
  }
}
