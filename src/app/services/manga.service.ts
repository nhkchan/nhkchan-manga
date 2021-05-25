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

  private readonly _mangaList = new BehaviorSubject<Array<any>>(null);
  readonly mangaList$ = this._mangaList.asObservable();

  private readonly _coverList = new BehaviorSubject<Array<any>>(null);
  readonly coverList$ = this._coverList.asObservable();

  private readonly _manga = new BehaviorSubject<any>(null);
  readonly manga$ = this._manga.asObservable();

  private readonly _cover = new BehaviorSubject<any>(null);
  readonly cover$ = this._cover.asObservable();

  constructor(private _http: HttpClient) {}

  getMdAtHomeBaseURL(): string {
    return this._mdAtHomeBaseUrl.value;
  }

  setMdAtHomeBaseURL(value: string): void {
    this._mdAtHomeBaseUrl.next(value);
  }

  getMangaChapterList(): Array<string> {
    return this._mangaChapterList.value;
  }

  setMangaChapterList(value: Array<string>): void {
    this._mangaChapterList.next(value);
  }

  getMangaChapterHash(): string {
    return this._mangaChapterHash.value;
  }

  setMangaChapterHash(value: string): void {
    this._mangaChapterHash.next(value);
  }

  getMangaList(): Array<any> {
    return this._mangaList.value;
  }

  setMangaList(value: Array<any>): void {
    this._mangaList.next(value);
  }

  getCoverList(): Array<any> {
    return this._coverList.value;
  }

  setCoverList(value: Array<any>): void {
    this._coverList.next(value);
  }

  getCurrentManga(): any {
    return this._manga.value;
  }

  setCurrentManga(value: any) {
    this._manga.next(value);
  }

  getCurrentCover(): any {
    return this._cover.value;
  }

  setCurrentCover(value: any) {
    this._cover.next(value);
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
      return this._http.get(environment.mangadexBaseUrl + '/cover', { params });
    } else {
      return of(null);
    }
  }

  getMangaCoverImage(url: string): Observable<any> {
    return this._http.get(url);
  }
}
