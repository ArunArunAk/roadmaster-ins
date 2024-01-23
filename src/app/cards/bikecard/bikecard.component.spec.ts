import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikecardComponent } from './bikecard.component';

describe('BikecardComponent', () => {
  let component: BikecardComponent;
  let fixture: ComponentFixture<BikecardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BikecardComponent]
    });
    fixture = TestBed.createComponent(BikecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
