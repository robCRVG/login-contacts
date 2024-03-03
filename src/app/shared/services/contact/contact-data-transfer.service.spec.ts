import { TestBed } from '@angular/core/testing';

import { ContactDataTransferService } from './contact-data-transfer.service';

describe('ContactDataTransferService', () => {
  let service: ContactDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
