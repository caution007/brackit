import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontPageComponent } from './main/front-page/front-page.component';
import { TournamentsComponent } from './main/tournament/tournaments.component';
import { TournamentComponent } from './main/tournament/tournament.component';
import { NotfoundComponent } from './main/notfound/notfound.component';

const routes: Routes = [
    { path: "", redirectTo: '/frontpage', pathMatch: 'full' },
    { path: "tournaments", component: TournamentsComponent },
    { path: "tournament/:id", component: TournamentComponent },
    { path: "frontpage", component: FrontPageComponent },
    { path: "404", component: NotfoundComponent },
    { path: "**", redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}