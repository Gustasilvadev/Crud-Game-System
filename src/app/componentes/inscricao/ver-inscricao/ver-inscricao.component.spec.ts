import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerInscricaoComponent } from './ver-inscricao.component';

describe('VerInscricaoComponent', () => {
  let component: VerInscricaoComponent;
  let fixture: ComponentFixture<VerInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
