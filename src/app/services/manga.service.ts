import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private readonly _mdAtHomeBaseUrl = new BehaviorSubject<string>('');
  readonly mdAtHomeBaseUrl$ = this._mdAtHomeBaseUrl.asObservable();

  private readonly _mangaChapterList = new BehaviorSubject<Array<string>>(null);
  readonly mangaChapterList$ = this._mangaChapterList.asObservable();

  private readonly _mangaChapterHash = new BehaviorSubject<string>(null);
  readonly mangaChapterHash$ = this._mangaChapterHash.asObservable();

  constructor(private _http: HttpClient) {}

  getMdAtHomeBaseURL(): string {
    return this._mdAtHomeBaseUrl.getValue();
  }

  setMdAtHomeBaseURL(value: string): void {
    this._mdAtHomeBaseUrl.next(value);
  }

  getMangaChapterList(): Array<string> {
    return this._mangaChapterList.getValue();
  }

  setMangaChapterList(value: Array<string>): void {
    this._mangaChapterList.next(value);
  }

  getMangaChapterHash(): string {
    return this._mangaChapterHash.getValue();
  }

  setMangaChapterHash(value: string): void {
    this._mangaChapterHash.next(value);
  }

  getManga(ids: Array<string>, title: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (ids && ids.length > 0) {
      for (let i = 0; i < ids.length; i++) {
        if (i == 0) {
          params = params.set('ids[' + i + ']', ids[i]);
        } else {
          params = params.append('ids[' + i + ']', ids[i]);
        }
      }

      console.log(ids);
    }

    if (title && title != '') {
      if (params.keys.length > 1) {
        params = params.append('tile', title);
      } else {
        params = params.set('title', title);
      }
    }

    console.log(params);

    return this._http.get(environment.mangadexBaseUrl + '/manga', { params });
  }

  getMangaFeed(id: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('order[chapter]', 'desc');
    params = params.append('locales[0]', 'en');
    return this._http.get(environment.mangadexBaseUrl + `/manga/${id}/feed`, {
      params,
    });
  }

  getScantalationGroupList(ids: Array<string>): Observable<any> {
    let params: HttpParams = new HttpParams();
    if (ids && ids.length > 0) {
      for (let i = 0; i < ids.length; i++) {
        if (i == 0) {
          params = params.set('ids[' + i + ']', ids[i]);
        } else {
          params = params.append('ids[' + i + ']', ids[i]);
        }
      }

      console.log(ids);
    }

    console.log(params);

    return this._http.get(environment.mangadexBaseUrl + '/group', { params });
  }

  getMangaDexAtHomeURL(chapterId: string): Observable<any> {
    return this._http.get(environment.mangadexBaseUrl + `/at-home/server/${chapterId}`);
  }

}