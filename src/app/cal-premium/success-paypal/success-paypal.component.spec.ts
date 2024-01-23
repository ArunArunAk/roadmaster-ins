import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPaypalComponent } from './success-paypal.component';

describe('SuccessPaypalComponent', () => {
  let component: SuccessPaypalComponent;
  let fixture: ComponentFixture<SuccessPaypalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessPaypalComponent]
    });
    fixture = TestBed.createComponent(SuccessPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
