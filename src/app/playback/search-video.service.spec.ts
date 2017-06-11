import { TestBed, inject } from '@angular/core/testing';

import { SearchVideoService } from './search-video.service';

describe('SearchVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchVideoService]
    });
  });

  it('should be created', inject([SearchVideoService], (service: SearchVideoService) => {
    expect(service).toBeTruthy();
  }));
});
