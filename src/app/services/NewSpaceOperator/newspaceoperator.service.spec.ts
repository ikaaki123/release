import { TestBed } from '@angular/core/testing';

import { NewspaceoperatorService } from './newspaceoperator.service';

describe('NewspaceoperatorService', () => {
  let service: NewspaceoperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewspaceoperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
