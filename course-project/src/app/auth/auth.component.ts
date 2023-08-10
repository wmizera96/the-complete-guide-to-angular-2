import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription, take } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(TemplateRef, { static: false }) alertHost;
  private closeAlertSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ) {}

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
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.showErrorAlert(error.message);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.closeAlertSubscription.unsubscribe();
  }

  private showErrorAlert(message: string) {
    const componentRef = this.viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    this.closeAlertSubscription = componentRef.instance.close.subscribe(() => {
      this.closeAlertSubscription.unsubscribe();
      this.viewContainerRef.clear();
    });
  }
}
