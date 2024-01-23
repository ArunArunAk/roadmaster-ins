import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminapproveComponent } from './adminapprove.component';

describe('AdminapproveComponent', () => {
  let component: AdminapproveComponent;
  let fixture: ComponentFixture<AdminapproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminapproveComponent]
    });
    fixture = TestBed.createComponent(AdminapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
