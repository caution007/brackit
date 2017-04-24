import { Component, OnInit } from '@angular/core';


import { ProfileService } from '../services/profile.service';
import { TournamentService } from '../../tournament/services/tournament.service';
import { PanelService } from '../../profile/services/panel.service';
import { Auth } from '../../../auth/auth.service';
//<button id="submitButton" name="submitButton" class="btn btn-success" (click)="_panelService.selectedPanel(1)">Save</button>

@Component({
  selector: 'app-your-tournaments',
  templateUrl: './your-tournaments.component.html',
  styleUrls: ['./your-tournaments.component.css']
})
export class YourTournamentsComponent implements OnInit {

  private _user;
  private _profile;

  private _yourTournaments: Array<any>;

  constructor(private _tournamentService: TournamentService,
                private _panelService: PanelService,
                  private _auth: Auth,
                    private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    if (this._auth.authenticated()) {
      this._profileService.getProfile(this._user.user_id).subscribe(profile => {
        if (profile.length == 1) {
          this._profile = profile[0];
        }

        this._tournamentService.getYourTournaments(this._profile._id).subscribe(tournaments => {
          this._yourTournaments = tournaments;
          console.log(this._yourTournaments);
        });
      });
    }

    
  }
}
