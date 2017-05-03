import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentType } from '../model/TournamentType';
import { EnumConverter } from '../../utilities/EnumConverter';

@Injectable()
export class TournamentService {

  private _url = 'http://localhost:3000/api';
  private _enumConverter = new EnumConverter();

  constructor(private _http: Http) {}

  getAllTournaments() {
    return this._http.get(this._url + '/tournaments')
      .map(res => res.json());
  }

  getTournament(id) {
    return this._http.get(this._url + '/tournaments/' + id)
      .map(res => res.json());
  }

  getAllTournamentInfo(type, id) {
    let httpGet;
    switch(TournamentType.ROUNDROBINLEAGUE) {
      case type:
        httpGet = this._url + '/roundrobin/';
        break;
    }

    return this._http.get(httpGet + id)
      .map(res => res.json());
  }

  getYourTournaments(id) {
    return this._http.get(this._url + '/tournaments/userid/' + id)
      .map(res => res.json());
  }

  getTeamsAndPlayers(id) {
    return this._http.get(this._url + '/tournament/teams/' + id)
      .map(res => res.json());
  }

  getPlayers(id) {
    return this._http.get(this._url + '/tournament/players/' + id)
      .map(res => res.json());
  }

  getMatches(id) {
    return this._http.get(this._url + '/tournament/matches/' + id)
      .map(res => res.json());
  }

  createTournament(tournament) {
    console.log(tournament);
    return this._http.post(this._url + '/tournament', {tournament})
      .map(res => res.json());
  }

  joinTournament(tournId, type, id, name, cType) {
    let tournType = this._enumConverter.tournamentTypeToString(type);
    return this._http.post(this._url + '/tournament/join', {tournId, tournType, id, name, cType})
      .map(res => res.json());
  }

  updateTournament(tournament) {
    return this._http.put(this._url + '/tournament/update/' + tournament._id, tournament)
          .map(res => res.json());
  }

  leaveTournament(tournId, cType, type, id) {
    let tournType = this._enumConverter.tournamentTypeToString(type);
    return this._http.post(this._url + '/tournament/leavetournament', {tournId, cType, tournType, id})
      .map(res => res.json());
  }

  startTournament(tournId) {
    console.log(tournId);
    return this._http.post(this._url + '/starttournament', {tournId})
      .map(res => res.json());
  }

  createFixtures(id, type, mType, cType, rType, start, interval) {
    return this._http.post(this._url + '/fixtures', {id, type, mType, cType, rType, start, interval})
      .map(res => res.json());
  }

  submitResult(scoreOne, scoreTwo, matchId, tournId, incDraws, regType, matchType, participentCheck, points, participents) {
    return this._http.post(this._url + '/matchresult', {scoreOne, scoreTwo, matchId, tournId, incDraws, regType, matchType, participentCheck, points, participents})
      .map(res => res.json());
  }

  getAPIUrl() {
    return this._url;
  }
}
