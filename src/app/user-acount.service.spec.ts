import { TestBed, inject } from '@angular/core/testing';

import { UserAcountService } from './user-acount.service';

describe('UserAcountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAcountService]
    });
  });

  it('should be created', inject([UserAcountService], (service: UserAcountService) => {
    expect(service).toBeTruthy();
  }));
});
