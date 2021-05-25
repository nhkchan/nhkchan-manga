import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MangaService } from 'src/app/services/manga.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  mangaList: Array<any> = null;
  mangaListWCovers: Array<any> = null;
  searchForm = new FormGroup({
    mangaTitle: new FormControl('', [Validators.required]),
  });
  listLength: number;
  offset: number;
  coverArtRetrieved: boolean = false;

  hideLoadingSpinner: boolean = false;
  hideHttpSpinner: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private _manga: MangaService,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.hideLoadingSpinner = true;
    this.mangaListWCovers = new Array<string>();
    this._manga.getManga(null, null, null, null, null).subscribe((resp) => {
      if (resp && resp.results) {
        this.processManga(resp);
        this.listLength = resp.total;
      } //  end if of mang response.
      this.hideHttpSpinner = true;
    });
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  onSearch() {
    this.hideHttpSpinner = false;
    this._manga
      .getManga(null, this.searchForm.get('mangaTitle').value, null, null, null)
      .subscribe((resp) => {
        if (resp && resp.results) {
          this.processManga(resp);
          this.listLength = resp.total;
          this.hideHttpSpinner = true;
        }
        console.log(resp);
      });
  }

  onPageChange(event: any) {
    this.coverArtRetrieved = false;
    this.hideHttpSpinner = false;
    this._manga
      .getManga(
        null,
        this.searchForm.get('mangaTitle').value
          ? this.searchForm.get('mangaTitle').value
          : null,
        event.pageSize.toString(),
        (event.pageIndex * event.pageSize).toString(),
        null
      )
      .subscribe((resp) => {
        if (resp && resp.results) {
          this.processManga(resp);
          this.hideHttpSpinner = true;
          this.scroll.scrollToPosition([0, 0]);
        }
      });
    console.log(event);
  }

  processManga(mangaResp: any): void {
    //  map new array for results.
    this._manga.setMangaList([...mangaResp.results]);
    this.mangaList = new Array<string>();
    let coverArtIds = new Array<string>();
    mangaResp.results.forEach((m) => {
      this.mangaList.push(m.data.id);
      let mangaRelationship = m.relationships;
      coverArtIds.push(
        mangaRelationship[
          mangaRelationship.findIndex((r) => r.type == 'cover_art')
        ].id
      );
    });
    this.listLength = mangaResp.total;

    //  Get Manga Covert Art by ID
    this._manga.getMangaCovertArtById(coverArtIds).subscribe((covers) => {
      this._manga.setCoverList([...covers.results]);
    });
  }
}
