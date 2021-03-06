import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbButtonModule, NbActionsModule, NbMenuModule, NbContextMenuModule } from '@nebular/theme';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
import { LoginService } from './services/login.service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { interceptorProviders } from './interceptors/interceptors';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    PagesModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbActionsModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    TokenService,
    LoginService,
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
