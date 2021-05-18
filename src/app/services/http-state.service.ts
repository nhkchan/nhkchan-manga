import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpStateService {
  private readonly _httpStateSource = new BehaviorSubject<boolean>(true);
  readonly httpState$ = this._httpStateSource.asObservable();

  constructor() {}

  getHttpState(): boolean {
      return this._httpStateSource.getValue();
  }

  setHttpState(value: boolean): void {
      this._httpStateSource.next(value);
  }

}
