import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbIconModule } from '@nebular/theme';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginComponent } from '../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { MangaComponent } from '../components/manga/manga.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { MangaDetailsComponent } from '../components/manga-details/manga-details.component';
import { ChapterComponent } from '../components/chapter/chapter.component';
import { RouterModule } from '@angular/router';
import { ChapterListComponent } from '../components/chapter-list/chapter-list.component';
import { MatPaginatorModule } from '@angular/material';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { ChapterListDetailsComponent } from '../components/chapter-list-details/chapter-list-details.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    MangaComponent,
    ProfileComponent,
    MangaDetailsComponent,
    ChapterComponent,
    ChapterListComponent,
    ChapterListDetailsComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    PagesRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    SwiperModule
    ],
  providers: [
    TokenService,
    LoginService,
    CookieService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [
    SpinnerComponent
  ]
})
export class PagesModule { }
