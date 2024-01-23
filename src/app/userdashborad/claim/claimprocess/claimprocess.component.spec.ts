import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimprocessComponent } from './claimprocess.component';

describe('ClaimprocessComponent', () => {
  let component: ClaimprocessComponent;
  let fixture: ComponentFixture<ClaimprocessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimprocessComponent]
    });
    fixture = TestBed.createComponent(ClaimprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
