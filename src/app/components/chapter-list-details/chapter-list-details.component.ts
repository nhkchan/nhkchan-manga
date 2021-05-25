import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chapter-list-details',
  templateUrl: './chapter-list-details.component.html',
  styleUrls: ['./chapter-list-details.component.css']
})
export class ChapterListDetailsComponent implements OnInit {

  private _manga = new BehaviorSubject<any>(null);
  private _mangaFeed = new BehaviorSubject<any>(null);

  @Input() set manga(value: any) { 
      this._manga.next(value); 
  }
  
  get manga() {
     return this._manga.getValue();
  }


  @Input() set mangaFeed(value: any) { 
      this._mangaFeed.next(value); 
  }
  
  get mangaFeed() {
     return this._mangaFeed.getValue();
  }

  constructor() { }

  ngOnInit() {
  }

}
