import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Typeahead } from 'ng2-typeahead';
import { TinymceModule } from 'angular2-tinymce';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth/auth.guard';

// COMPONENTS //
import { AppComponent } from './app.component';
import { TournamentsComponent } from './main/tournament/tournaments.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { FrontPageComponent } from './main/front-page/front-page.component';
import { FooterComponent } from './main/footer/footer.component';
import { TournamentComponent } from './main/tournament/tournament.component';
import { NotfoundComponent } from './main/notfound/notfound.component';
import { ProfileComponent } from './main/profile/profile.component';
import { DclWrapper } from './main/utilities/dclwrapper.component';
import { EditProfileComponent } from './main/profile/edit-profile/edit-profile.component';
import { GameAccountsComponent } from './main/profile/game-accounts/game-accounts.component';
import { ProfileMainComponent } from './main/profile/profile-main/profile-main.component';
import { CreateTournamentComponent } from './main/profile/create-tournament/create-tournament.component';
import { YourTournamentsComponent } from './main/profile/your-tournaments/your-tournaments.component';
import { TeamComponent } from './main/team/team.component';
import { CreateTeamComponent } from './main/profile/create-team/create-team.component';
import { JoinedTournamentsComponent } from './main/profile/joined-tournaments/joined-tournaments.component';
import { YourTeamsComponent } from './main/profile/your-teams/your-teams.component';
import { PublicProfileComponent } from './main/profile/public-profile/public-profile.component';
import { MatchComponent } from './main/match/match.component';
import { EditTournamentComponent } from './main/profile/edit-tournament/edit-tournament.component';

// SERVICES //
import { TournamentService } from './main/tournament/services/tournament.service';
import { ProfileService } from './main/profile/services/profile.service';
import { PanelService } from './main/profile/services/panel.service';
import { TeamService } from './main/team/services/team.service';
import { MatchService } from './main/match/services/match.service';
import { Auth } from './auth/auth.service';



export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
          tokenGetter: (() => localStorage.getItem('token')),
          globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    DclWrapper,
    TournamentsComponent,
    NavigationComponent,
    FrontPageComponent,
    FooterComponent,
    TournamentComponent,
    NotfoundComponent,
    ProfileComponent,
    EditProfileComponent,
    GameAccountsComponent,
    ProfileMainComponent,
    CreateTournamentComponent,
    YourTournamentsComponent,
    TeamComponent,
    CreateTeamComponent,
    JoinedTournamentsComponent,
    YourTeamsComponent,
    PublicProfileComponent,
    MatchComponent,
    EditTournamentComponent,
    Typeahead
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TinymceModule.withConfig({})
  ],
  providers: [ 
    TournamentService,
    ProfileService,
    TeamService,
    PanelService,
    MatchService,
    Auth,
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  entryComponents: [
    EditProfileComponent,
    GameAccountsComponent,
    ProfileMainComponent,
    CreateTournamentComponent,
    YourTournamentsComponent,
    CreateTeamComponent,
    JoinedTournamentsComponent,
    YourTeamsComponent,
    EditTournamentComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
