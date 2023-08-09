import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let observable: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      observable = this.authService.login(email, password);
    } else {
      observable = this.authService.signup(email, password);
    }

    observable.subscribe({
      next: () => {
        this.router.navigate(["/recipes"]);
      },
      error: (error) => {
        this.error = error.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
