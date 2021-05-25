import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { ViewportScroller } from '@angular/common';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class ChapterComponent implements OnInit {

  atHomeURL: string;
  chapterList: Array<string>;
  chapterHash: string;
  pageNumber: number;
  loading: boolean = false;
  chapter: string = '';

  constructor(private _manga: MangaService, private scroll: ViewportScroller) { }

  ngOnInit() {

    this.pageNumber = 0;
    this._manga.mangaChapterList$.pipe(
      switchMap(mangaChapterList => {
        if (mangaChapterList) {
          this.chapterList = [...mangaChapterList];
        }
        return this._manga.mdAtHomeBaseUrl$}),
      switchMap(mdAtHomeBaseUrl => {
        if (mdAtHomeBaseUrl) {
          this.atHomeURL = mdAtHomeBaseUrl;
        }
        return this._manga.mangaChapterHash$;
      })
    ).subscribe(chapterHash => {
      if (chapterHash) {
        this.chapterHash = chapterHash;
      }
      if (this.chapterList) {
        this.chapter = this.atHomeURL + '/data/' + chapterHash + '/' + this.chapterList[this.pageNumber];
      } else {
        this.chapter = 'assets/img/not-found.jpg';
      }
    });

  }

  nextPage(): void {
    this.loading = true;
    this.pageNumber++;
    this.chapter = this.atHomeURL + '/data/' + this.chapterHash + '/' + this.chapterList[this.pageNumber];
    this.scroll.scrollToPosition([0,0]);
  }
  prevPage(): void {
    this.loading = true;
    this.pageNumber--;
    this.chapter = this.atHomeURL + '/data/' + this.chapterHash + '/' + this.chapterList[this.pageNumber];
    this.scroll.scrollToPosition([0,0]);
  }

  onLoad() {
    this.loading = false;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
  }

}
