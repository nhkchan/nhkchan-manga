import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  atHomeURL: string;
  chapterList: Array<string>;
  chapterHash: string;
  pageNumber: number;
  loading: boolean = false;

  constructor(private _manga: MangaService, private scroll: ViewportScroller) { }

  ngOnInit() {

    this.pageNumber = 0;
    this.atHomeURL = this._manga.getMdAtHomeBaseURL();
    this.chapterHash = this._manga.getMangaChapterHash();
    this.chapterList = [...this._manga.getMangaChapterList()];

  }

  nextPage(): void {
    this.loading = true;
    this.pageNumber++;
    this.scroll.scrollToPosition([0,0]);
  }

  onLoad() {
    this.loading = false;
  }

}
