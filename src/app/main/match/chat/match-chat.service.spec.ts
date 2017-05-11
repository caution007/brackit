import { TestBed, inject } from '@angular/core/testing';

import { MatchChatService } from './match-chat.service';

describe('MatchChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchChatService]
    });
  });

  it('should ...', inject([MatchChatService], (service: MatchChatService) => {
    expect(service).toBeTruthy();
  }));
});
