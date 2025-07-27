import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutpainelComponent } from './layoutpainel.component';

describe('LayoutpainelComponent', () => {
  let component: LayoutpainelComponent;
  let fixture: ComponentFixture<LayoutpainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutpainelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutpainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
