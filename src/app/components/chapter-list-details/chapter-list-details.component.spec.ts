import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterListDetailsComponent } from './chapter-list-details.component';

describe('ChapterListDetailsComponent', () => {
  let component: ChapterListDetailsComponent;
  let fixture: ComponentFixture<ChapterListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
