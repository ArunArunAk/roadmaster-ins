import { TestBed } from '@angular/core/testing';

import { UserinsurancedetailService } from './userinsurancedetail.service';

describe('UserinsurancedetailService', () => {
  let service: UserinsurancedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserinsurancedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
