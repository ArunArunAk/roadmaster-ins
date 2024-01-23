import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFreeComponent } from './success-free.component';

describe('SuccessFreeComponent', () => {
  let component: SuccessFreeComponent;
  let fixture: ComponentFixture<SuccessFreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessFreeComponent]
    });
    fixture = TestBed.createComponent(SuccessFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
