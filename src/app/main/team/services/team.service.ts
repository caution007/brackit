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

  createteam(team) {
    return this._http.post(this._url + '/team', {team})
      .map(res => res.json());
  }
}
