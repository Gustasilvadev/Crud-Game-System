import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPatrocinadorComponent } from './ver-patrocinador.component';

describe('VerPatrocinadorComponent', () => {
  let component: VerPatrocinadorComponent;
  let fixture: ComponentFixture<VerPatrocinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPatrocinadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPatrocinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
