import { TestBed } from '@angular/core/testing';

import { CommentairesService } from './commentaires.service';

describe('CommentairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentairesService = TestBed.get(CommentairesService);
    expect(service).toBeTruthy();
  });
});
