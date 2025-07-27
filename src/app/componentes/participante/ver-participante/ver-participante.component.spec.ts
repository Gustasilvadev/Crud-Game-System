import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParticipanteComponent } from './ver-participante.component';

describe('VerParticipanteComponent', () => {
  let component: VerParticipanteComponent;
  let fixture: ComponentFixture<VerParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerParticipanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
