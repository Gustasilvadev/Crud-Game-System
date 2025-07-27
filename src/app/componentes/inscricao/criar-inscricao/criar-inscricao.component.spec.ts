import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarInscricaoComponent } from './criar-inscricao.component';

describe('CriarInscricaoComponent', () => {
  let component: CriarInscricaoComponent;
  let fixture: ComponentFixture<CriarInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
