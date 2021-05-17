import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _token = new BehaviorSubject<string>("");
  readonly token$ = this._token.asObservable();

  private readonly _refreshToken = new BehaviorSubject<string>("");
  readonly refreshToken$ = this._refreshToken.asObservable();

  constructor() {}

  getToken(): string {
      return this._token.getValue();
  }

  setToken(value: string): void {
      this._token.next(value);
  }

  getRefreshToken(): string {
    return this._refreshToken.getValue();
  }

  setRefreshToken(value: string): void {
    this._refreshToken.next(value);
}

}
