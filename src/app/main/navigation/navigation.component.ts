import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Auth } from '../../auth/auth.service';
import { ProfileService } from '../profile/services/profile.service';
import { SearchService } from '../search/services/search.service';
import { PanelService } from '../profile/services/panel.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private _subscr: Subscription;

  private _user;
  private _search;
  private _noSearch = false;

  constructor(private _auth: Auth, 
                private _profileService: ProfileService,
                  private _router: Router,
                    private _searchService: SearchService,
                      private _panelService: PanelService) {}

  ngOnInit() {
    this._user = JSON.parse(localStorage.getItem('profile'));

    this._subscr = this._searchService.getNoSearch()
      .subscribe(noSearch => {
        this._noSearch = noSearch;
        console.log(this._noSearch);
      });
  }

  setSearch() {
    this._searchService.setSearch(this._search);
    this._router.navigate(['/search']);
  }

  logout() {
    this._user = null;
  }

  ngOnDestroy() {
    this._subscr.unsubscribe();
  }
}
