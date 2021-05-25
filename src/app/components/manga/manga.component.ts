import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import * as moment from 'moment/moment';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  loadingImg: boolean = false;
  coverImg: string = null;
  loadImageFailed: boolean = false;
  lastUpdated: string = '';

  private _manga = new BehaviorSubject<any>(null);
  manga: any;

  @Input() set mangaId(value: any) { 
      this._manga.next(value); 
  }
  
  get mangaId() {
     return this._manga.getValue();
  }

  constructor(private _mangaSvc: MangaService, private _util: UtilService) { }

  ngOnInit() {
    this._manga.subscribe(manga => {

      this.manga = this._mangaSvc.getMangaList().find(m => {
        return m.data.id === manga;
      });

      this._mangaSvc.setCurrentManga(this.manga);

      this._mangaSvc.coverList$.subscribe(coverList => {
        if (coverList) {
          let cover = coverList.find(coverListData => {
            return coverListData.relationships.some(relationship => {
              return relationship.id === manga;
            })
          });
          if (cover) {
            this._mangaSvc.setCurrentCover(cover);
            this.loadingImg = true;
            this.coverImg = `https://uploads.mangadex.org/covers/${manga}/${cover.data.attributes.fileName}.256.jpg`;
            this.loadImageFailed = false;
            let updatedAt = new Date(this.manga.data.attributes.updatedAt);
            let now = moment();
            this.lastUpdated = this._util.timeDifference(now.diff(updatedAt));
          } else {
            this.loadImageFailed = true;
            this.loadingImg = false;
          }
        }
      });
    });
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
    this.coverImg = 'assets/img/not-found.jpg';
  }

}
