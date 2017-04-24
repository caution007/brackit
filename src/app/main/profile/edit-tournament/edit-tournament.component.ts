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

  private _tournament;
  private _tournamentType;

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
        });
    });
  }

}
