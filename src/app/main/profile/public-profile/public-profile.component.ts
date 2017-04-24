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

  constructor(private _activatedRoute: ActivatedRoute,
                private _profileService: ProfileService) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._paramID = params['id'];
      
      this._profileService.getPublicProfile(this._paramID).subscribe(profile => {
        this._profile = profile;
        console.log(this._profile);
      })
    })
  }

}
