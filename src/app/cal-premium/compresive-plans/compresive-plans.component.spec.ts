import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompresivePlansComponent } from './compresive-plans.component';

describe('CompresivePlansComponent', () => {
  let component: CompresivePlansComponent;
  let fixture: ComponentFixture<CompresivePlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompresivePlansComponent]
    });
    fixture = TestBed.createComponent(CompresivePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
