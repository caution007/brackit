import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentService } from '../../tournament/services/tournament.service';

@Injectable()
export class MatchService {

  private _url;

  constructor(private _tournamentService: TournamentService,
                private _http: Http) { 
    this._url = _tournamentService.getAPIUrl();
  }

  getMatch(id) {
    return this._http.get(this._url + '/match/' + id)
      .map(res => res.json());
  }

}
