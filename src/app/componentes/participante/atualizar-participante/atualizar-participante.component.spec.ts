import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarParticipanteComponent } from './atualizar-participante.component';

describe('AtualizarParticipanteComponent', () => {
  let component: AtualizarParticipanteComponent;
  let fixture: ComponentFixture<AtualizarParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarParticipanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
