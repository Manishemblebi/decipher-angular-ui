import { TestBed } from '@angular/core/testing';

import { EnsemblService } from './ensembl-service';

describe('EnsemblService', () => {
  let service: EnsemblService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnsemblService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
