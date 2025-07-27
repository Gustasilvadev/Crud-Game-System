import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarPatrocinadorComponent } from './atualizar-patrocinador.component';

describe('AtualizarPatrocinadorComponent', () => {
  let component: AtualizarPatrocinadorComponent;
  let fixture: ComponentFixture<AtualizarPatrocinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarPatrocinadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarPatrocinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
