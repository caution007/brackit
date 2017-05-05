import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentService } from '../../tournament/services/tournament.service';

@Injectable()
export class SearchService {

  private _url;

  private _noSearch = new BehaviorSubject(false);
  private _noSearchVal = this._noSearch.asObservable();

  private _currentSearch;

  constructor(private _tournamentService: TournamentService,
                private _http: Http) {
    this._url = _tournamentService.getAPIUrl();
  }

  setSearch(search) {
    this._currentSearch = search;
  }

  getSearch() {
    return this._currentSearch;
  }

  setNoSearch(noSearch) {
    this._noSearch.next(noSearch);
  }

  getNoSearch() {
    return this._noSearchVal;
  }

  searchTournaments(search) {
    return this._http.get(this._url + '/search/tournaments/' + search)
      .map(res => res.json());
  }

  searchTeams(search) {
    return this._http.get(this._url + '/search/teams/' + search)
      .map(res => res.json());
  }

  searchmembers(search) {
    return this._http.get(this._url + '/search/members/' + search)
      .map(res => res.json());
  }

}
