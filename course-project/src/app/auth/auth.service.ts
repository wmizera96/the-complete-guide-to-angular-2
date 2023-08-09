import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, tap } from "rxjs";
import { loginUrl, registerUrl } from "src/endpoint";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(registerUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(tap((response) => this.createUser(response)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(tap((response) => this.createUser(response)));
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");

    if (this.tokenExpirationTimeout) {
      clearTimeout(this.tokenExpirationTimeout);
    }
  }

  autoLogin() {
    const userDataJson = localStorage.getItem("userData");
    if (!userDataJson) return;

    const userData = JSON.parse(userDataJson);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimeout = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }

  private createUser(response: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.localId,
      response.idToken,
      expirationDate
    );

    this.user.next(user);
    this.autoLogout(+response.expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }
}
