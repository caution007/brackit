import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PanelService {

  private _panel = new BehaviorSubject(0);
  private _panelVal = this._panel.asObservable();
  
  private _selectedId;

  constructor() { }

  getPanel() {
    return this._panelVal;
  }

  private setPanel(panel) {
    this._panel.next(panel);
  }

  selectedPanel(panel, id) {
    this._selectedId = id;
    this.setPanel(panel);
  }

  getSelectedId() {
    return this._selectedId;
  }
}

