import { TestBed } from '@angular/core/testing';

import { AppCategoriesService } from './app-categories.service';

describe('AppCategoriesService', () => {
  let service: AppCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
