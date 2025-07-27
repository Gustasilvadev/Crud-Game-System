/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { JogoService } from './jogo.service';

describe('Service: Jogo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JogoService]
    });
  });

  it('should ...', inject([JogoService], (service: JogoService) => {
    expect(service).toBeTruthy();
  }));
});
