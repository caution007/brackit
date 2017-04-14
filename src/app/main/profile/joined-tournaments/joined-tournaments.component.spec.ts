/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JoinedTournamentsComponent } from './joined-tournaments.component';

describe('JoinedTournamentsComponent', () => {
  let component: JoinedTournamentsComponent;
  let fixture: ComponentFixture<JoinedTournamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedTournamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
