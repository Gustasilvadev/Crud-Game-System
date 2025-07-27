/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PremioService } from './premio.service';

describe('Service: Premio', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PremioService]
    });
  });

  it('should ...', inject([PremioService], (service: PremioService) => {
    expect(service).toBeTruthy();
  }));
});
