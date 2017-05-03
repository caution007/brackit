import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private _user;
  private _profile;

  constructor(private _profileService: ProfileService) {
    this._user = JSON.parse(localStorage.getItem('profile'));
  }

  ngOnInit() {
    this._profileService.getProfile(this._user.user_id, this._user.username).subscribe(profile => {
      if (profile.profile.length == 1) {
        this._profile = profile.profile[0];
      }
    });
  }

  updateProfile() {
    this._profileService.updateProfile(this._profile._id, this._profile).subscribe(profile => {});
  }
}
