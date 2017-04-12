import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

  private _url = 'http://localhost:3000/api';
  private _profile;

  constructor(private http: Http) { }

  getProfile(id) {
    return this.http.get(this._url + '/profile/' + id)
      .map(res => res.json());
  }

  updateProfile(id, profile) {
    return this.http.put(this._url + '/profile/update/' + id, profile)
      .map(res => res.json());
  }

}
