import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarParticipanteComponent } from './criar-participante.component';

describe('CriarParticipanteComponent', () => {
  let component: CriarParticipanteComponent;
  let fixture: ComponentFixture<CriarParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarParticipanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
