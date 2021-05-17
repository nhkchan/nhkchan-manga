import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { MangaComponent } from '../components/manga/manga.component';
import { MangaDetailsComponent } from '../components/manga-details/manga-details.component';
import { ChapterComponent } from '../components/chapter/chapter.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'manga/:mangaId',
    component: MangaDetailsComponent
  },
  {
    path: 'chapter',
    component: ChapterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
