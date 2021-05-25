import { Component, OnInit, Input } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input() feed: any;
  published: string = '';

  constructor(private _manga: MangaService, private _router: Router, private _util: UtilService) { }

  ngOnInit() {
    let publishedAt = new Date(this.feed.data.attributes.publishAt);
    let now = moment();
    this.published = this._util.timeDifference(now.diff(publishedAt));
  }

  getChapter(chapterId: string, chapterHash: string, chapterList: Array<string>) {
    this._manga.getMangaDexAtHomeURL(chapterId).subscribe(url => {
      if (url) {
        this._manga.setMdAtHomeBaseURL(url.baseUrl);
        this._manga.setMangaChapterHash(chapterHash);
        this._manga.setMangaChapterList(chapterList);
        this._router.navigateByUrl('/chapter');
      }
    }
    )
  }

}
