import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TournamentService } from '../../tournament/services/tournament.service';

@Injectable()
export class MatchChatService {

  private _userDetails;

  private _url;  
  private _socket;

  constructor(private _tournamentService: TournamentService,
                private _http: Http) { 
    this._url = _tournamentService.getAPIUrl().slice(0, -4);
    console.log(this._url);
  }

  sendMessage(msg){
    this._socket.emit('new-message', msg);    
  }

  joinMatchChat(msg) {
    this._socket.emit('join-match-chat', msg);
  }

  listenForMessages() {
    let obsrv = new Observable(obsrv => {
      this._socket = io(this._url);
      this._socket.on('message', (object) => {
        obsrv.next(object);    
      });

      return () => { this._socket.disconnect(); };  
    })   

    return obsrv;
  } 

  setUserDetails(details) {
    this._userDetails = details;
  }

  getUserDetails() {
    return this._userDetails;
  }

  getMessages(id) {
    return this._http.get(this._url + '/api/matchmessages/' + id)
      .map(res => res.json());
  }

  postMessage(msg, matchId) {
    return this._http.post(this._url + '/api/matchmessage', {msg, matchId})
      .map(res => res.json());
  }

}
