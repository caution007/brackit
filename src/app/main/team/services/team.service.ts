import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentService } from '../../tournament/services/tournament.service';

@Injectable()
export class TeamService {

  private _url;

  constructor(private _tournamentService: TournamentService,
                private _http: Http) { 
    this._url = _tournamentService.getAPIUrl();
  }

  public createteam(team) {
    return this._http.post(this._url + '/team', {team})
      .map(res => res.json());
  }

  public getTeam(id) {
    return this._http.get(this._url + '/team/' + id)
      .map(res => res.json());
  }

  public joinTeam(teamId, id, name, joinPassword) {
    return this._http.post(this._url + '/team/join', {teamId, id, name, joinPassword})
      .map(res => res.json());
  }

  public getOwnedTeams(id) {
    return this._http.get(this._url + '/ownedteams/' + id)
      .map(res => res.json());
  }

  public leaveTeam(teamId, memberId) {
    return this._http.post(this._url + '/team/leave', {teamId, memberId})
      .map(res => res.json());
  }
}
