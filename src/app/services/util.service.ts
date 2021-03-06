import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private readonly _hideHeader = new BehaviorSubject<boolean>(false);
  readonly hideHeader$ = this._hideHeader.asObservable();

  constructor() { }

  setHideHeader(value: boolean) {
    this._hideHeader.next(value);
  }

  getHideHeader(): boolean {
    return this._hideHeader.value;
  }

  timeDifference(elapsed) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' second(s) ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minute(s) ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hour(s) ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' day(s) ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' month(s) ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' year(s) ago';   
    }
}

}
