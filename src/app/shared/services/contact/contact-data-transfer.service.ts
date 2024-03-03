import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/GetAllContactsResponse';

@Injectable({
  providedIn: 'root',
})
export class ContactDataTransferService {
  public contactsDataEmitter$ =
    new BehaviorSubject<Array<GetAllContactResponse> | null>(null);

  public contactContacts: Array<GetAllContactResponse> = [];

  setContactDatas(contacts: Array<GetAllContactResponse>): void {
    if (contacts) {
      this.contactsDataEmitter$.next(contacts);
      this.getContactDatas();
    }
  }

  getContactDatas() {
    this.contactsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((contact) => contact.id != null))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.contactContacts = response;
          }
        },
      });
    return this.contactContacts;
  }
}
