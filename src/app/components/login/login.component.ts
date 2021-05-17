import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private _cookie: CookieService
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginForm);
    this.loginService.doLogin(this.loginForm.get("userName").value, this.loginForm.get("password").value).subscribe(resp => {
      if (resp && resp.result == "ok") {
        if (resp.token) {
          this.tokenService.setToken(resp.token.session);
          this.tokenService.setRefreshToken(resp.token.refresh);
          this._cookie.set("r", this.tokenService.getRefreshToken(), 30);
          this._cookie.set("s", this.tokenService.getToken(), 1);
        }
      }
    })
  }

}
