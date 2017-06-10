import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackSearchComponent } from './playback-search.component';

describe('PlaybackSearchComponent', () => {
  let component: PlaybackSearchComponent;
  let fixture: ComponentFixture<PlaybackSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybackSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
