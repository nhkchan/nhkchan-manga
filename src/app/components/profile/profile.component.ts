import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: string = '';
  userName: string = '';
  followedManga: Array<any> = null;
  customList: Array<any> = null;

  hideLoadingSpinner: boolean = false;
  hideHttpSpinner: boolean = false;

  listLength: number;
  customListLength: number;

  constructor(private _login: LoginService, private _token: TokenService, private _cookie: CookieService, private _router: Router, private scroll: ViewportScroller) { }

  ngOnInit() {

    this.hideLoadingSpinner = true;

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

    this._login.getUserFollowedManga(this._token.getToken(), null, null).subscribe(resp => {
      if (resp) {
        this.followedManga = [...resp.results];
        this.hideHttpSpinner = true;
        this.listLength = resp.total;
      }
    });

    this._login.getUserCustomLists(
      this._token.getToken(), null, null).subscribe(resp => {
      if (resp && resp.results) {
        this.customList = [...resp.results];
        this.hideHttpSpinner = true;
        this.customListLength = resp.total;
      }
    })

  }

  onPageChange(event: any) {
    this.hideHttpSpinner = false;
    this._login.getUserFollowedManga(
      this._token.getToken(), event.pageSize.toString(), (event.pageIndex * event.pageSize).toString()).subscribe(resp => {
      if (resp && resp.results) {
        this.followedManga = [...resp.results];
        this.hideHttpSpinner = true;
        this.scroll.scrollToPosition([0,0]);
      }
    })
    console.log(event);
  }

  onCustomListPageChange(event: any) {
    this.hideHttpSpinner = false;
    this._login.getUserCustomLists(
      this._token.getToken(), event.pageSize.toString(), (event.pageIndex * event.pageSize).toString()).subscribe(resp => {
      if (resp && resp.results) {
        this.followedManga = [...resp.results];
        this.hideHttpSpinner = true;
        this.scroll.scrollToPosition([0,0]);
      }
    })
    console.log(event);
  }

}
