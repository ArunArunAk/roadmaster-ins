import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceareaComponent } from './insurancearea.component';

describe('InsuranceareaComponent', () => {
  let component: InsuranceareaComponent;
  let fixture: ComponentFixture<InsuranceareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceareaComponent]
    });
    fixture = TestBed.createComponent(InsuranceareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
