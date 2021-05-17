import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {

  @Input() manga: any;

  constructor() { }

  ngOnInit() {
    console.log(this.manga);
  }

}
