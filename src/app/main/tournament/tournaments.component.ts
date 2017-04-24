import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentService } from './services/tournament.service';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  private tournaments: Array<any> = [];

  constructor(private tournamentService: TournamentService,
                private router: Router) {
  }

  ngOnInit() {
    this.tournamentService.getAllTournaments().subscribe(tournament => {
      this.tournaments = tournament;
    });
  }

  navToTournament(selectedTournamentID) {
    this.router.navigate(['/tournament', selectedTournamentID]);
  }

}
