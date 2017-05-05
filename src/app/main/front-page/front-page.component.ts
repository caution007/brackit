import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentService } from '../tournament/services/tournament.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  private _newTournaments;

  constructor(private _tournamentService: TournamentService,
                private _router: Router) { }

  ngOnInit() {
    this._tournamentService.getNewTournaments().subscribe(result => {
      this._newTournaments = result.tournaments;
      console.log(this._newTournaments);
    })
  }

  navToTournament(selectedTournamentID) {
    this._router.navigate(['/tournament', selectedTournamentID]);
  }

}
