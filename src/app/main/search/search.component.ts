import { Component, OnInit, OnDestroy } from '@angular/core';

import { SearchService } from '../search/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private _searchQuery;
  private _searchList;

  private _searchTournSub;

  constructor(private _searchService: SearchService) { }

  ngOnInit() {
    this._searchQuery = this._searchService.getSearch()
    console.log(this._searchQuery);
    this.search(0, this._searchQuery);
    this._searchService.setNoSearch(true);
  }

  search(id, search) {
    if(search) {
      switch(id) {
        case 0:
        console.log(search)
          this.searchTournaments(search)
          break;
        case 1:
          break;
        case 2:
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

  ngOnDestroy() {
    this._searchService.setNoSearch(false);
  }
}
