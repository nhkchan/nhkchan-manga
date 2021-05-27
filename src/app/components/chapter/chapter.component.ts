import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { ViewportScroller } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util.service';
import { SwiperOptions } from 'swiper/core';

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
  chapterListURLs: Array<string>;
  chapterListURLsReversed: Array<string>;
  chapterHash: string;
  pageNumber: number;
  loading: boolean = false;
  chapter: string = '';
  loaded = 0;
  verticalScroll: boolean = false;
  hideHeaderflag: boolean = false;

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: true
  };

  constructor(private _manga: MangaService, private scroll: ViewportScroller, private _util: UtilService) { }

  ngOnInit() {
    this.loading = true;
    this.chapterListURLs = new Array<any>();
    this.chapterListURLsReversed = new Array<any>();
    this.loaded = 0;
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
        this.chapterList.forEach(chapter => {
          this.chapterListURLs.push(this.atHomeURL + '/data/' + chapterHash + '/' + chapter);
        });
        this.chapterListURLsReversed = [...this.chapterListURLs.reverse()];
        this.pageNumber = this.chapterListURLsReversed.length-1;
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

  preloaded() {
    this.loaded++;
    if(this.chapterListURLs.length == this.loaded){
      this.loading = false;
      console.log("All images loaded");
    }
  }

  hideHeader(): void {
    this.hideHeaderflag = !this.hideHeaderflag;
    this._util.setHideHeader(this.hideHeaderflag);
  }
}
