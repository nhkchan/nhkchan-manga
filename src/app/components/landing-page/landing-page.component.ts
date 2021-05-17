import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  mangaList: Array<any> = null;

  constructor(private dialogService: NbDialogService, private _manga: MangaService) { }

  ngOnInit(): void {
    this._manga.getManga(null, null).subscribe(resp => {
      if (resp && resp.results) {
        this.mangaList = [...resp.results];
      }
    })
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

}
