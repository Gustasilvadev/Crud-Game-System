import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarInscricaoComponent } from './atualizar-inscricao.component';

describe('AtualizarInscricaoComponent', () => {
  let component: AtualizarInscricaoComponent;
  let fixture: ComponentFixture<AtualizarInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
