/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PatrocinadorService } from './patrocinador.service';

describe('Service: Patrocinador', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatrocinadorService]
    });
  });

  it('should ...', inject([PatrocinadorService], (service: PatrocinadorService) => {
    expect(service).toBeTruthy();
  }));
});
