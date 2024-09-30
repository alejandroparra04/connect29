import { TestBed } from '@angular/core/testing';

import { EntregableService } from './entregable.service';

describe('EntregableService', () => {
  let service: EntregableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
