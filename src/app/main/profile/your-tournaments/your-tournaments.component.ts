import { Component, OnInit } from '@angular/core';


import { ProfileService } from '../services/profile.service';
import { TournamentService } from '../../tournament/services/tournament.service';
import { PanelService } from '../../profile/services/panel.service';
import { Auth } from '../../../auth/auth.service';

@Component({
  selector: 'app-your-tournaments',
  templateUrl: './your-tournaments.component.html',
  styleUrls: ['./your-tournaments.component.css']
})
export class YourTournamentsComponent implements OnInit {

  private _user;
  private _profile;

  private _yourTournaments: Array<any>;

  private _startTournSub;
  private _createFixturesSub;

  constructor(private _tournamentService: TournamentService,
                private _panelService: PanelService,
                  private _auth: Auth,
                    private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    if (this._auth.authenticated()) {
      this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
        if (profile.profile.length == 1) {
          this._profile = profile.profile[0];
        }

        this._tournamentService.getYourTournaments(this._profile._id).subscribe(tournaments => {
          this._yourTournaments = tournaments;
          console.log(this._yourTournaments);
        });
      });
    }
  }

  startTournament(id, type, mType, cType, rType, start, interval) {
    if(confirm("Are you sure you want to start the tournament?")) {
      this._startTournSub = this._tournamentService.startTournament(id).subscribe(result => {
        if (result.status == 'success') {
          console.log(result);
          this._startTournSub.unsubscribe();
        }
      });

      this._createFixturesSub = this._tournamentService.createFixtures(id, type, mType, cType, rType, start, interval)
        .subscribe(result => {
          if (result.status == 'success') {
          console.log(result);
          this._createFixturesSub.unsubscribe();
        }
        })
    }
  }
}
