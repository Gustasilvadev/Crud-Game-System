/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerPremioComponent } from './ver-premio.component';

describe('VerPremioComponent', () => {
  let component: VerPremioComponent;
  let fixture: ComponentFixture<VerPremioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPremioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPremioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
