import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumoursComponent } from './rumours.component';

describe('RumoursComponent', () => {
  let component: RumoursComponent;
  let fixture: ComponentFixture<RumoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RumoursComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RumoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
