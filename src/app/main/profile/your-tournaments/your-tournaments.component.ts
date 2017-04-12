import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../../tournament/services/tournament.service';

@Component({
  selector: 'app-your-tournaments',
  templateUrl: './your-tournaments.component.html',
  styleUrls: ['./your-tournaments.component.css']
})
export class YourTournamentsComponent implements OnInit {

  private _yourTournaments: any = [];
  private _user;

  constructor(private _tournamentService: TournamentService) { }

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));

    this._tournamentService.getYourTournaments(this._user.user_id).subscribe(tournaments => {
      this._yourTournaments = tournaments;
    });
  }

}
