import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PanelService {

  private _panel = new BehaviorSubject(0);
  private _panelVal = this._panel.asObservable();
  
  constructor() { }

  getPanel() {
    return this._panelVal;
  }

  setPanel(panel) {
    this._panel.next(panel);
  }

  selectedPanel(panel) {
    this.setPanel(panel);
  }
}
