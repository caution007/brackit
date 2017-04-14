import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Auth } from '../../auth/auth.service';
import { ProfileService } from './services/profile.service';
import { PanelService } from './services/panel.service';

import { ProfileMainComponent } from './profile-main/profile-main.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GameAccountsComponent } from './game-accounts/game-accounts.component';
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { YourTournamentsComponent } from './your-tournaments/your-tournaments.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { JoinedTournamentsComponent } from './joined-tournaments/joined-tournaments.component';
import { YourTeamsComponent } from './your-teams/your-teams.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private _subscr: Subscription;

  private _user;
  private _panel;

  constructor(private _profileService: ProfileService,
                private _auth: Auth,
                  private _panelService: PanelService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
    console.log(this._user);
  }

  ngOnInit() {
    this._subscr = this._panelService.getPanel()
      .subscribe(panel => {
        this.panelChecker(panel);
      });

    this._panel = ProfileMainComponent;
  }

  panelChecker(check) {
    switch(check) {
      case 0: 
        this._panel = ProfileMainComponent;
        break;
      case 1: 
        this._panel = EditProfileComponent;
        break;
      case 2: 
        this._panel = GameAccountsComponent;
        break;
      case 3: 
        //this._panel = GameAccountsComponent;
        break;
      case 4: 
        this._panel = YourTournamentsComponent;
        break;
      case 5: 
        this._panel = JoinedTournamentsComponent;
        break;
      case 6: 
        this._panel = CreateTournamentComponent;
        break;
      case 7: 
        this._panel = CreateTeamComponent;
        break;
      case 8: 
        this._panel = YourTeamsComponent;
        break;
      case 9: 
       //this._panel = YourTeamsComponent;
        break;
    }
  }

  ngOnDestroy() {
    this._subscr.unsubscribe();
  }
}
