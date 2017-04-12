import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  
  private _user;
  private _profile;
  private _dateJoined;

  constructor(private profileService: ProfileService) { 
    this._user = JSON.parse(localStorage.getItem('profile'));
    this.formatDateJoined(this._user.created_at);
  }

  ngOnInit() {
    this.profileService.getProfile(this._user.user_id).subscribe(profile => {
      if (profile.length == 1) {
        if(!profile[0].username) {
          profile[0].username = this._user.username;
          this.profileService.updateProfile(profile[0]._id, profile[0]).subscribe(profile => {
            profile[0] = profile;
          })
        }
        console.log(profile[0]);
        this._profile = profile[0];
      }
    });
  }

  formatDateJoined(date) {
    let d = new Date(date);
    this._dateJoined = d.toDateString();
  }


}
