import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './main/front-page/front-page.component';
import { TournamentsComponent } from './main/tournament/tournaments.component';
import { TournamentComponent } from './main/tournament/tournament.component';
import { NotfoundComponent } from './main/notfound/notfound.component';
import { ProfileComponent } from './main/profile/profile.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: "", redirectTo: '/frontpage', pathMatch: 'full' },
    { path: "frontpage", component: FrontPageComponent },
    { path: "tournaments", component: TournamentsComponent },
    { path: "tournament/:id", component: TournamentComponent },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "404", component: NotfoundComponent },
    { path: "**", redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}