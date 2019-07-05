import { TestBed } from '@angular/core/testing';

import { NgxMultiGaugeService } from './ngx-multi-gauge.service';

describe('NgxMultiGaugeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMultiGaugeService = TestBed.get(NgxMultiGaugeService);
    expect(service).toBeTruthy();
  });
});
