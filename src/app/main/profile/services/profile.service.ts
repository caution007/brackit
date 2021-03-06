import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentService } from '../../tournament/services/tournament.service';

@Injectable()
export class ProfileService {

  private _url;
  private _profile;

  constructor(private _tournamentService: TournamentService,
                private _http: Http) {
    this._url = _tournamentService.getAPIUrl();
  }

  getProfile(userId, username) {
    return this._http.post(this._url + '/profile', {userId, username})
      .map(res => res.json());
  }

  updateProfile(id, profile) {
    return this._http.put(this._url + '/profile/update/' + id, profile)
      .map(res => res.json());
  }

  getPublicProfile(id) {
    return this._http.get(this._url + '/profile/public/' + id)
      .map(res => res.json());
  }

  getProfileTeams(id) {
    return this._http.get(this._url + '/profile/teams/' + id)
      .map(res => res.json());
  }

  getProfileTournaments(id) {
    return this._http.get(this._url + '/profile/tournaments/' + id)
      .map(res => res.json());
  }
}
