import { Component, OnInit, Input } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  loadingImg: boolean = false;
  coverImg: string = "";
  loadImageFailed: boolean = false;
  lastUpdated: string = '';

  @Input() manga: any;

  constructor(private _manga: MangaService) { }

  ngOnInit() {
    this.loadingImg = true; 
    if (this.manga != null &&  this.manga.data.attributes.coverArt != null) {
      this.coverImg = `https://uploads.mangadex.org/covers/${this.manga.data.id}/${this.manga.data.attributes.coverArt.data.attributes.fileName}.256.jpg`;
    }
    let updatedAt = new Date(this.manga.data.attributes.updatedAt);
    let now = moment();
    console.log(now.diff(updatedAt));
    console.log(this.timeDifference(now.diff(updatedAt)));
    this.lastUpdated = this.timeDifference(now.diff(updatedAt));
  }

  loadedImage() {
    this.loadingImg = false;
  }

  onImgError(event: any) {
    console.log(event);
    this.loadingImg = false;
    this.loadImageFailed = true;
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
