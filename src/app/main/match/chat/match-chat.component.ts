import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatchChatService } from './match-chat.service';

@Component({
  selector: 'app-match-chat',
  templateUrl: './match-chat.component.html',
  styleUrls: ['./match-chat.component.css']
})
export class MatchChatComponent implements OnInit {

  //@ViewChild('chatList') private _chat: ElementRef;

  private _userDetails;

  private _connection;
  private _messages = [];
  private _message;
  constructor(private _matchChatService: MatchChatService,
                private _router: Router) { }

  ngOnInit() {
    this._userDetails = this._matchChatService.getUserDetails();
    
    this._matchChatService.getMessages(this._userDetails.match).subscribe(result => {
      this._messages = result.messages;
    })

    this._connection = this._matchChatService.listenForMessages().subscribe(message => {
      this._messages.push(message);
    })

    this._matchChatService.joinMatchChat(this._userDetails.match);
  }

  sendMessage() {
    let msgObj = {
      message: this._message,
      participent: this._userDetails.participent,
      username: this._userDetails.profile.username,
      userId: this._userDetails.profile._id
    }
    this._matchChatService.sendMessage(msgObj);
    this._message = '';
    console.log(this._messages);
    this._matchChatService.postMessage(msgObj, this._userDetails.match).subscribe(result => {
      console.log(result);
    })
  }

  navToPlayer(selectedPlayerID) {
    this._router.navigate(['/profile', selectedPlayerID]);
  }

  ngOnDestroy() {
    this._connection.unsubscribe();
  }

  // scrollToBottom() {
  //   this._chat.nativeElement.scrollTop = this._chat.nativeElement.scrollHeight;
  // }

}
