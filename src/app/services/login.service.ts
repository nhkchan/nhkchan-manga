import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _userId = new BehaviorSubject<string>('');
  readonly userId$ = this._userId.asObservable();

  private readonly _userName = new BehaviorSubject<string>('');
  readonly userName$ = this._userName.asObservable();

  req = {
    username: '',
    password: '',
  };

  refreshReq = {
    token: '',
  };

  constructor(private _http: HttpClient) {}

  getUserId(): string {
    return this._userId.getValue();
  }

  setUserId(value: string): void {
    this._userId.next(value);
  }

  getUserName(): string {
    return this._userName.getValue();
  }

  setUserName(value: string): void {
    this._userName.next(value);
  }

  doLogin(username: string, password: string): Observable<any> {
    this.req.username = username;
    this.req.password = password;

    return this._http.post(
      environment.mangadexBaseUrl + '/auth/login',
      this.req
    );
  }

  checkToken(token: string): Observable<any> {
    return this._http.get(environment.mangadexBaseUrl + '/auth/check', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  refreshToken(token: string): Observable<any> {
    this.refreshReq.token = token;
    return this._http.post(
      environment.mangadexBaseUrl + '/auth/refresh',
      this.refreshReq
    );
  }

  getLoggedUserDetails(token: string): Observable<any> {
    return this._http.get(environment.mangadexBaseUrl + '/user/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getUser(token: string, userId: string): Observable<any> {
    return this._http.get(environment.mangadexBaseUrl + `/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getUserFollowedManga(token: string): Observable<any> {
    return this._http.get(environment.mangadexBaseUrl + `/user/follows/manga`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

}
