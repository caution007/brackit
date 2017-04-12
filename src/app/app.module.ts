import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

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

// SERVICES //
import { TournamentService } from './main/tournament/services/tournament.service';
import { ProfileService } from './main/profile/services/profile.service';
import { Auth } from './auth/auth.service';
import { EditProfileComponent } from './main/profile/edit-profile/edit-profile.component';
import { GameAccountsComponent } from './main/profile/game-accounts/game-accounts.component';
import { ProfileMainComponent } from './main/profile/profile-main/profile-main.component';
import { CreateTournamentComponent } from './main/profile/create-tournament/create-tournament.component';
import { YourTournamentsComponent } from './main/profile/your-tournaments/your-tournaments.component';

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
    YourTournamentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ 
    TournamentService,
    ProfileService,
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
    YourTournamentsComponent
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule { }
