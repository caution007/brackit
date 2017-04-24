import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './main/front-page/front-page.component';
import { TournamentsComponent } from './main/tournament/tournaments.component';
import { TournamentComponent } from './main/tournament/tournament.component';
import { TeamComponent } from './main/team/team.component';
import { NotfoundComponent } from './main/notfound/notfound.component';
import { ProfileComponent } from './main/profile/profile.component';
import { PublicProfileComponent } from './main/profile/public-profile/public-profile.component';
import { MatchComponent } from './main/match/match.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: "", redirectTo: '/frontpage', pathMatch: 'full' },
    { path: "frontpage", component: FrontPageComponent },
    { path: "tournaments", component: TournamentsComponent },
    { path: "tournament/:id", component: TournamentComponent },
    { path: "team/:id", component: TeamComponent },
    { path: "profile/:id", component: PublicProfileComponent },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "match/:id", component: MatchComponent },
    { path: "404", component: NotfoundComponent },
    { path: "**", redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}