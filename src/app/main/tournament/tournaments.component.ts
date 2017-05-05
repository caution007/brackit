import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentService } from './services/tournament.service';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  private _tournaments: Array<any> = [];

  constructor(private _tournamentService: TournamentService,
                private _router: Router) {
  }

  ngOnInit() {
    this._tournamentService.getAllTournaments().subscribe(tournament => {
      this._tournaments = tournament;
    });
  }

  navToTournament(selectedTournamentID) {
    this._router.navigate(['/tournament', selectedTournamentID]);
  }

}
