import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/getAllContactsResponse';

@Injectable({
  providedIn: 'root',
})
export class ContactDataTransferService {
  public productsDataEmitter$ =
    new BehaviorSubject<Array<GetAllContactResponse> | null>(null);

  public contactContacts: Array<GetAllContactResponse> = [];

  setProductsDatas(products: Array<GetAllContactResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getContactDatas();
    }
  }

  getContactDatas() {
    this.productsDataEmitter$
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
