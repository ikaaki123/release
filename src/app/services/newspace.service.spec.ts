import { TestBed } from '@angular/core/testing';

import { NewspaceService } from './newspace.service';

describe('NewspaceService', () => {
  let service: NewspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
