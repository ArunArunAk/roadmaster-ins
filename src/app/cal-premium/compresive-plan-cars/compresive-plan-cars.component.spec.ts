import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompresivePlanCarsComponent } from './compresive-plan-cars.component';

describe('CompresivePlanCarsComponent', () => {
  let component: CompresivePlanCarsComponent;
  let fixture: ComponentFixture<CompresivePlanCarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompresivePlanCarsComponent]
    });
    fixture = TestBed.createComponent(CompresivePlanCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
