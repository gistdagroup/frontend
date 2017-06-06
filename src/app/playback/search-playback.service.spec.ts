import { TestBed, inject } from '@angular/core/testing';

import { SearchPlaybackService } from './search-playback.service';

describe('SearchPlaybackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPlaybackService]
    });
  });

  it('should ...', inject([SearchPlaybackService], (service: SearchPlaybackService) => {
    expect(service).toBeTruthy();
  }));
});
