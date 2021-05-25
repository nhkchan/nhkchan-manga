import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {

  mangaId: string;
  mangaFeed: any;
  manga: any;
  scantalationGroupList: Array<string> = new Array();

  constructor(private _router: Router, private _route: ActivatedRoute, private _manga: MangaService) { }

  ngOnInit() {

    this._route.params.subscribe(params => {

      this.manga = this._manga.getCurrentManga();
      if (!this.manga) {
        this._manga.getManga(new Array(params.mangaId), null, null, null, null).subscribe(manga => {
          if (manga && manga.results.length > 0) {
            this.manga = manga.results[0].data;
          }
        });
      }

      this._manga.getMangaFeed(params.mangaId).subscribe(mangaFeed => {
        this.mangaFeed = [...mangaFeed.results];
      })

    });

  }

}
