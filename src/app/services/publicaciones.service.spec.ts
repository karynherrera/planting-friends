import { TestBed, inject } from '@angular/core/testing';

import { PublicacionesService } from './publicaciones.service';

describe('PublicacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PublicacionesService]
    });
  });

  it('should be created', inject([PublicacionesService], (service: PublicacionesService) => {
    expect(service).toBeTruthy();
  }));
});
