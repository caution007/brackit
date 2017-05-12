import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

  private _paramID;
  private _profile;
  private _memberSince;

  private _steamLink;

  private _publicProfileSub;

  constructor(private _activatedRoute: ActivatedRoute,
                private _profileService: ProfileService,
                  private _router: Router) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];
      
      this._publicProfileSub = this._profileService.getPublicProfile(this._paramID).subscribe(result => {
        this._profile = result.profile;
        this.formatmemberSince(this._profile.joined);
        this._steamLink = 'http://steamcommunity.com/id/' + this._profile.steam;
        if(result.status == 'success') {
          this._publicProfileSub.unsubscribe();
        }

        console.log(this._profile);
      })
    })
  }

  navToTournament(selectedTournamentID) {
    this._router.navigate(['/tournament', selectedTournamentID]);
  }

  navToTeam(selectedTeamID) {
    this._router.navigate(['/team', selectedTeamID]);
  }

  formatmemberSince(date) {
    let d = new Date(date);
    this._memberSince = d.toDateString();
  }

}
