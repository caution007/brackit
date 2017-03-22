import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentType } from '../model/TournamentType';
import { EnumConverter } from '../../utilities/EnumConverter';

@Injectable()
export class TournamentService {

  private url = 'http://localhost:3000/api';
  private enumConverter = new EnumConverter();

  constructor(private http: Http) {}

  getAllTournaments() {
    return this.http.get(this.url + '/tournaments')
      .map(res => res.json());
  }

  getTournament(id) {
    return this.http.get(this.url + '/tournaments/' + id)
      .map(res => res.json());
  }

  getAllTournamentInfo(type, id) {
    let httpGet;
    switch(TournamentType.ROUNDROBINLEAGUE) {
      case type:
        httpGet = this.url + '/roundrobin/';
        break;
    }

    return this.http.get(httpGet + id)
      .map(res => res.json());
  }

  createFixtures(id, teams, type) {
    return this.http.post(this.url + '/fixtures', {id, teams, type})
      .map(res => res.json());
  }
}
