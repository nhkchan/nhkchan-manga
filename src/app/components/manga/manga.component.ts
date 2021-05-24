import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import * as moment from 'moment/moment';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  loadingImg: boolean = false;
  coverImg: string = null;
  loadImageFailed: boolean = true;
  lastUpdated: string = '';

  private _manga = new BehaviorSubject<any>(null);
  manga: any;

  @Input() set mangaId(value: any) { 
      this._manga.next(value); 
  }
  
  get mangaId() {
     return this._manga.getValue();
  }

  constructor(private _mangaSvc: MangaService) { }

  ngOnInit() {
    this._manga.subscribe(manga => {
      console.log(manga);

      this.manga = this._mangaSvc.getMangaList().find(m => {
        return m.data.id === manga;
      });
      console.log(this.manga);

      // console.log(manga);
      // if (manga && manga.data.attributes.coverArt) {
      //   this.loadingImg = true;
      //   console.log(manga.data.attributes.coverArt);
      //   this.coverImg = `https://uploads.mangadex.org/covers/${manga.data.id}/${manga.data.attributes.coverArt.data.attributes.fileName}.256.jpg`;
      //   let updatedAt = new Date(manga.data.attributes.updatedAt);
      //   let now = moment();
      //   this.lastUpdated = this.timeDifference(now.diff(updatedAt));
      //   this.loadImageFailed = false;
      // }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  loadedImage() {
    this.loadingImg = false;
    this.loadImageFailed = false;
  }

  onImgError(event: any) {
    console.log("Image Error")
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
