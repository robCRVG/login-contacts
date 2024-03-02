import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthToken } from 'src/app/models/interfaces/user/auth/AuthToken';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private cookie: CookieService) {}

  authUser(requestData: AuthRequest): Observable<AuthToken> {
    return this.http.get<AuthToken>(
      `${this.API_URL}/Auth/Login/?login=${requestData.login}&senha=${requestData.senha}`
    );
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
