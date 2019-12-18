import { TestBed } from '@angular/core/testing';

import { MainBodyBuilderService } from './main-body-builder.service';

describe('MainBodyBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainBodyBuilderService = TestBed.get(MainBodyBuilderService);
    expect(service).toBeTruthy();
  });
});
