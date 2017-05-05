import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../search/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private _searchQuery;
  private _searchList;
  private _searchTab = 0;

  private _searchTournSub;
  private _searchTeamSub;
  private _searchMemberSub;

  constructor(private _searchService: SearchService,
                private _router: Router) { }

  ngOnInit() {
    this._searchQuery = this._searchService.getSearch()
    console.log(this._searchQuery);
    this.search(this._searchTab, this._searchQuery);
    this._searchService.setNoSearch(true);
  }

  search(id, search) {
    if(search) {
      switch(id) {
        case 0:
          console.log(search)
          this._searchTab = 0;
          this._searchList = undefined;
          this._searchService.setSearch(search);
          this.searchTournaments(search);
          break;
        case 1:
          this._searchTab = 1;
          this._searchList = undefined;
          this._searchService.setSearch(search);
          this.searchTeams(search);
          break;
        case 2:
          this._searchTab = 2;
          this._searchList = undefined;
          this._searchService.setSearch(search);
          this.searchMembers(search);
          break;
      }
    }
  }

  searchTournaments(search) {
    this._searchTournSub = this._searchService.searchTournaments(search).subscribe(result => {
      console.log(result);
      this._searchList = { tournaments: result.tournaments };
      if (result.status == 'success') {
        this._searchTournSub.unsubscribe();
      }
    })
  }

  searchTeams(search) {
    this._searchTeamSub = this._searchService.searchTeams(search).subscribe(result => {
      console.log(result);
      this._searchList = { teams: result.teams };
      if (result.status == 'success') {
        this._searchTeamSub.unsubscribe();
      }
    })
  }

  searchMembers(search) {
    this._searchMemberSub = this._searchService.searchmembers(search).subscribe(result => {
      console.log(result);
      this._searchList = { members: result.members };
      if (result.status == 'success') {
        this._searchMemberSub.unsubscribe();
      }
    })
  }

  navToTeam(selectedTeamID) {
    this._router.navigate(['/team', selectedTeamID]);
  }

  navToPlayer(selectedPlayerID) {
    this._router.navigate(['/profile', selectedPlayerID]);
  }

  navToTournament(selectedTournamentID) {
    this._router.navigate(['/tournament', selectedTournamentID]);
  }

  ngOnDestroy() {
    this._searchService.setNoSearch(false);
  }
}
