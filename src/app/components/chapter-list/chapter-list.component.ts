import { Component, OnInit, Input } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {

  @Input() feed: any;
  published: string = '';

  constructor(private _manga: MangaService, private _router: Router) { }

  ngOnInit() {
    let publishedAt = new Date(this.feed.data.attributes.publishAt);
    let now = moment();
    this.published = this.timeDifference(now.diff(publishedAt));
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
