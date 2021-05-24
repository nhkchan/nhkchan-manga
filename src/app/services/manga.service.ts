import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

  getManga(ids: Array<string>, title: string, limit: string, offset: string, total: string): Observable<any> {
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

    if (limit) {
      params = params.append('limit', limit);
    }

    if (offset) {
      params = params.append('offset', offset);
    }

    if (total) {
      params = params.append('total', total);
    }

    console.log(params);

    return this._http.get(environment.mangadexBaseUrl + '/manga', { params });
  }

  getMangaFeed(id: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.set('order[chapter]', 'desc');
    params = params.append('translatedLanguage[0]', 'en');
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

  getMangaCoverArt(mangaIds: Array<any>): Observable<any> {
    if (mangaIds) {
      console.log(mangaIds);
      let params: HttpParams = new HttpParams();
      for (let i = 0; i < mangaIds.length; i++) {
        if (i == 0) {
          params = params.set('manga[' + i + ']', mangaIds[i].data.id);
        } else {
          params = params.append('manga[' + i + ']', mangaIds[i].data.id);
        }
      }
      return this._http.get(environment.mangadexBaseUrl + '/cover', { params });
    } else {
      return of(null);
    }
  }

  getMangaCovertArtById(ids: Array<string>): Observable<any> {
    if (ids) {
      let params: HttpParams = new HttpParams();
      for (let i = 0; i < ids.length; i++) {
        if (i == 0) {
          params = params.set('ids[' + i + ']', ids[i]);
        } else {
          params = params.append('ids[' + i + ']', ids[i]);
        }
      }
      return this._http.get(environment.mangadexBaseUrl + '/cover', { headers: { 'User-Agent': 'Googlebot' }, params });
    } else {
      return of(null);
    }
  }

  getMangaCoverImage(url: string): Observable<any> {
    return this._http.get(url, {
      headers: {
        'User-Agent': 'Googlebot'
      }
    });
  }
}
