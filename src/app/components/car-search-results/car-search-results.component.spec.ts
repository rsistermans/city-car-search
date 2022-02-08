import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchResultsComponent } from './car-search-results.component';

describe('CarSearchResultsComponent', () => {
  let component: CarSearchResultsComponent;
  let fixture: ComponentFixture<CarSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
