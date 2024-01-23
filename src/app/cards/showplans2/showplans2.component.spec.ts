import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showplans2Component } from './showplans2.component';

describe('Showplans2Component', () => {
  let component: Showplans2Component;
  let fixture: ComponentFixture<Showplans2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Showplans2Component]
    });
    fixture = TestBed.createComponent(Showplans2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
