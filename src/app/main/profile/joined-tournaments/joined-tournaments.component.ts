import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TournamentService } from '../../tournament/services/tournament.service';
import { Auth } from '../../../auth/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-joined-tournaments',
  templateUrl: './joined-tournaments.component.html',
  styleUrls: ['./joined-tournaments.component.css']
})
export class JoinedTournamentsComponent implements OnInit {

  private _user;
  private _profile;

  private _tournaments;

  private _joinedTournSub;

  constructor(private _tournamentService: TournamentService,
                private _auth: Auth,
                  private _profileService: ProfileService,
                    private _router: Router) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    if (this._auth.authenticated()) {
      this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
        if (profile.profile.length == 1) {
          this._profile = profile.profile[0];
        }

        this._joinedTournSub = this._tournamentService.getJoinedTournaments(this._profile._id).subscribe(result => {
          this._tournaments = result.tournaments;
          if (result.status == 'success') {
            this._joinedTournSub.unsubscribe();
          }
        })
      });
    }
  }

  navToTournament(selectedTournamentID) {
    this._router.navigate(['/tournament', selectedTournamentID]);
  }

}
