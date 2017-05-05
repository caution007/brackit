import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../tournament/services/tournament.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  private _newTournaments;

  constructor(private _tournamentService: TournamentService) { }

  ngOnInit() {
    this._tournamentService.getNewTournaments().subscribe(result => {
      this._newTournaments = result.tournaments;
      console.log(this._newTournaments);
    })
  }

}
