import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MangaService } from 'src/app/services/manga.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  mangaList: Array<any> = null;
  mangaListWCovers: Array<any> = null;
  searchForm = new FormGroup({
    mangaTitle: new FormControl('', [Validators.required])
  });
  listLength: number;
  offset: number;
  coverArtRetrieved: boolean = false;

  hideLoadingSpinner: boolean = false;
  hideHttpSpinner: boolean = false;

  constructor(private dialogService: NbDialogService, private _manga: MangaService, private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.hideLoadingSpinner = true;
    this.mangaListWCovers = new Array<string>();
    this._manga.getManga(null, null, null, null, null).subscribe(resp => {

      if (resp && resp.results) {

        //  map new array for results.
        this._manga.setMangaList([...resp.results]);
        this.mangaList = new Array<string>();
        let coverArtIds = new Array<string>();
        resp.results.forEach(m => {
          this.mangaList.push(m.data.id);
          let mangaRelationship = m.relationships;
          coverArtIds.push(mangaRelationship[mangaRelationship.findIndex( r => r.type == 'cover_art' )].id);
        })
        // this.mangaList = [...resp.results];
        this.listLength = resp.total;


        //  Get Manga Covert Art by ID
        this._manga.getMangaCovertArtById(coverArtIds).subscribe(covers =>{
          this._manga.setCoverList([...covers.results]);
          // let coversList = [...covers.results];
          // this.mangaList.map(result => {
          //   if (result) {
          //     let coverArtId = result.relationships[result.relationships.findIndex( r => r.type == 'cover_art')].id;
          //     let coverItem = coversList.find(cover => {
          //       return cover.data.id === coverArtId
          //     });
          //     result.data.attributes.coverArt = coverItem;
          //   }

          //   this.coverArtRetrieved = true;
          // })
        });

      } //  end if of mang response.

      this.hideHttpSpinner = true;

    })
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onSearch() {
    this.hideHttpSpinner = false;
    this._manga.getManga(null, this.searchForm.get("mangaTitle").value, null, null, null).subscribe(resp => {
      if (resp && resp.results) {
        this.mangaList = [...resp.results];
        this.listLength = resp.total;
        this.hideHttpSpinner = true;
      }
      console.log(resp);
    }) 
  }

  onPageChange(event: any) {
    this.coverArtRetrieved = false;
    this.hideHttpSpinner = false;
    this._manga.getManga(
      null,
      this.searchForm.get("mangaTitle").value ? this.searchForm.get("mangaTitle").value : null, 
      event.pageSize.toString(), (event.pageIndex * event.pageSize).toString(), null).subscribe(resp => {
      if (resp && resp.results) {
        this.mangaList = [...resp.results];

        //  Get Manga Covert Art by ID

        let coverArtIds = new Array<string>();

        this.mangaList.forEach(manga => {
          
          let mangaRelationship = manga.relationships;
          coverArtIds.push(mangaRelationship[mangaRelationship.findIndex( r => r.type == 'cover_art' )].id);

        });

        this._manga.getMangaCovertArtById(coverArtIds).subscribe(covers =>{
          let coversList = [...covers.results];
          this.mangaList.map(result => {
            if (result) {
              let coverArtId = result.relationships[result.relationships.findIndex( r => r.type == 'cover_art')].id;
              let coverItem = coversList.find(cover => {
                return cover.data.id === coverArtId
              });
              result.data.attributes.coverArt = coverItem;
              console.log(result.data.attributes);
            }
            this.coverArtRetrieved = true;
          })
        });

        this.hideHttpSpinner = true;
        this.scroll.scrollToPosition([0,0]);
      }
    })
    console.log(event);
  }

}
