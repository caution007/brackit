import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule }         from './app-routing.module';

import { AppComponent } from './app.component';
import { TournamentsComponent } from './main/tournament/tournaments.component';
import { NavigationComponent } from './main/navigation/navigation.component';
import { FrontPageComponent } from './main/front-page/front-page.component';

import { TournamentService } from './main/tournament/services/tournament.service';
import { FooterComponent } from './main/footer/footer.component';
import { TournamentComponent } from './main/tournament/tournament.component';
import { NotfoundComponent } from './main/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    TournamentsComponent,
    NavigationComponent,
    FrontPageComponent,
    FooterComponent,
    TournamentComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ TournamentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
