import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MangaService } from 'src/app/services/manga.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  mangaList: Array<any> = null;
  searchForm = new FormGroup({
    mangaTitle: new FormControl('', [Validators.required])
  });
  listLength: number;
  offset: number;

  hideLoadingSpinner: boolean = false;
  hideHttpSpinner: boolean = false;

  constructor(private dialogService: NbDialogService, private _manga: MangaService, private scroll: ViewportScroller) { }

  ngOnInit(): void {
    this.hideLoadingSpinner = true;
    this._manga.getManga(null, null, null, null, null).subscribe(resp => {
      if (resp && resp.results) {
        this.mangaList = [...resp.results];
        this.listLength = resp.total;
        this.hideHttpSpinner = true;
      }
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
    this.hideHttpSpinner = false;
    this._manga.getManga(
      null,
      this.searchForm.get("mangaTitle").value ? this.searchForm.get("mangaTitle").value : null, 
      event.pageSize.toString(), (event.pageIndex * event.pageSize).toString(), null).subscribe(resp => {
      if (resp && resp.results) {
        this.mangaList = [...resp.results];
        this.hideHttpSpinner = true;
        this.scroll.scrollToPosition([0,0]);
      }
    })
    console.log(event);
  }

}
