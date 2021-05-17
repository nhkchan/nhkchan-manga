import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string = '';
  userName: string = '';
  followedManga: Array<any> = null;

  constructor(private _login: LoginService, private _token: TokenService, private _cookie: CookieService, private _router: Router) { }

  ngOnInit() {

    if (!this._token.getToken()) {
      this._router.navigateByUrl('');
    }

    if (!this._login.getUserId()) {
      this._login.getLoggedUserDetails(this._token.getToken()).subscribe(user => {
        this._login.setUserId(user.data.id)
        this._login.setUserName(user.data.attributes.username);
      });
    }
    this._login.userName$.subscribe(u => {
      this.userName = u;
    });
    this._login.userId$.subscribe(i => {
      this.userId = i;
    });

    this._login.getUserFollowedManga(this._token.getToken()).subscribe(resp => {
      if (resp) {
        this.followedManga = [...resp.results];
      }
    })

  }

}
