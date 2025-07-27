import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerJogoComponent } from './ver-jogo.component';

describe('VerJogoComponent', () => {
  let component: VerJogoComponent;
  let fixture: ComponentFixture<VerJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerJogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
