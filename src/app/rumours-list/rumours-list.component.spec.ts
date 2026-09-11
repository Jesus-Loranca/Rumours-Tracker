import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { RumoursListComponent } from './rumours-list.component';

describe('RumoursListComponent', () => {
  let component: RumoursListComponent;
  let fixture: ComponentFixture<RumoursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RumoursListComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: { queryParamMap: of(convertToParamMap({})) }
      }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RumoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rumourmongers from the data file', () => {
    expect(component.rumourmongers.length).toBeGreaterThan(0);
  });

  it('should select a rumourmonger and toggle the menu', () => {
    const rumourmonger = component.rumourmongers[0];

    component.toggleRumourmongerMenu();
    expect(component.rumourmongerMenuOpen).toBeTrue();

    component.selectRumourmonger(rumourmonger);

    expect(component.selectedRumourmonger).toBe(rumourmonger);
    expect(component.rumourmongerMenuOpen).toBeFalse();
  });
});
