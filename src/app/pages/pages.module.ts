import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule } from '@nebular/theme';

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

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginComponent,
    MangaComponent,
    ProfileComponent,
    MangaDetailsComponent,
    ChapterComponent,
    ChapterListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule.forRoot(),
    PagesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    TokenService,
    LoginService,
    CookieService
  ]
})
export class PagesModule { }
