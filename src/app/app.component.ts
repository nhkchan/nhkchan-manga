import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
import { LoginService } from './services/login.service';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'nhkchan-manga';

  isLoaded: boolean = false;
  loggedIn: boolean = false;
  sessionToken: string = '';
  refreshToken: string = '';
  hideHeader: boolean = false;

  items: NbMenuItem[] = [
    {
      title: 'Logout',
    },
    {
      title: 'Profile',
      link: 'profile',
    },
  ];

  constructor(
    private _cookie: CookieService,
    private _token: TokenService,
    private _login: LoginService,
    private _router: Router,
    private _util: UtilService
  ) {}

  ngOnInit(): void {

    this._util.hideHeader$.subscribe(hide => {
      this.hideHeader = hide;
    })
    this._router.events.subscribe((events) => {

      if(event instanceof NavigationStart)
      {
        this.isLoaded=true;
      }

      if (events instanceof NavigationEnd) {

        this.isLoaded=false;
        this.sessionToken = '';
        this.refreshToken = '';

        if (this._token.getToken()) {
          this.sessionToken = this._token.getToken();
        } else {
          this.sessionToken = this._cookie.get('s');
        }

        if (this.sessionToken && this.sessionToken != '') {
          this._login.checkToken(this.sessionToken).subscribe((resp) => {
            if (resp) {
              if (resp.isAuthenticated) {
                this.loggedIn = true;
                this._token.setToken(this.sessionToken);
              } else {
                this.loggedIn = false;
              }
            } else {
              this.loggedIn = false;
            }

            if (!this.loggedIn) {
              if (this._token.getRefreshToken()) {
                this.refreshToken = this._token.getRefreshToken();
              } else {
                this.refreshToken = this._cookie.get('r');
              }

              if (this.refreshToken && this.refreshToken != '') {
                this._login
                  .refreshToken(this.refreshToken)
                  .subscribe((resp) => {
                    if (resp && resp.result == 'ok') {
                      this._token.setToken(resp.token.session);
                      this._token.setRefreshToken(resp.token.refresh);
                      this._cookie.set('s', this._token.getToken(), 1);
                      this._cookie.set('r', this._token.getRefreshToken(), 30);
                    }
                  });
              }
            }
          });
        } else {
          this.loggedIn = false;
        }
      }
    });
  }
}
