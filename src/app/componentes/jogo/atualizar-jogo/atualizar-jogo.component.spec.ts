import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarJogoComponent } from './atualizar-jogo.component';

describe('AtualizarJogoComponent', () => {
  let component: AtualizarJogoComponent;
  let fixture: ComponentFixture<AtualizarJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
