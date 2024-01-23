import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtocarddashboardComponent } from './addtocarddashboard.component';

describe('AddtocarddashboardComponent', () => {
  let component: AddtocarddashboardComponent;
  let fixture: ComponentFixture<AddtocarddashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddtocarddashboardComponent]
    });
    fixture = TestBed.createComponent(AddtocarddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
