export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    return new Promise((res) => setTimeout(() => res(this.loggedIn), 1000));
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
