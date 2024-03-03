import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { CreateContactRequest } from 'src/app/models/interfaces/contact/request/CreateContactRequest';
import { EditContactRequest } from 'src/app/models/interfaces/contact/request/EditContactRequest';
import { DeleteContactResponse } from 'src/app/models/interfaces/contact/response/DeleteContactResponse';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/GetAllContactsResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private httpClient: HttpClient, private cookie: CookieService) {}

  getAllContacts(): Observable<Array<GetAllContactResponse>> {
    return this.httpClient.get<Array<GetAllContactResponse>>(
      `${this.API_URL}/Contatos/GetContatos`,
      this.httpOptions
    );
  }

  deleteContact(idContato: string): Observable<DeleteContactResponse> {
    return this.httpClient.delete<DeleteContactResponse>(
      `${this.API_URL}/Contatos/DeleteContato`,
      {
        ...this.httpOptions,
        params: {
          id: idContato,
        },
      }
    );
  }

  createContact(
    requestDatas: CreateContactRequest
  ): Observable<CreateContactRequest> {
    return this.httpClient.post<CreateContactRequest>(
      `${this.API_URL}/Contatos/CreateContato`,
      requestDatas,
      this.httpOptions
    );
  }

  editContact(
    requestDatas: EditContactRequest
  ): Observable<void> {
    return this.httpClient.put<void>(
      `${this.API_URL}/contact/edit`,
      requestDatas,
      this.httpOptions
    );
  }
}
