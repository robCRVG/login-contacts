import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { GetAllContactResponse } from 'src/app/models/interfaces/contact/response/getAllContactsResponse';
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
}
