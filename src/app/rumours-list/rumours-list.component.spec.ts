import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RumoursListComponent } from './rumours-list.component';

describe('RumoursListComponent', () => {
  let component: RumoursListComponent;
  let fixture: ComponentFixture<RumoursListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RumoursListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RumoursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load rumours from the data file', () => {
    expect(component.rumours.length).toBeGreaterThan(0);
  });
});
