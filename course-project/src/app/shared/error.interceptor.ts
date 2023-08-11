import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("Outgoing request: ", req.url);
    console.log(req.headers);
    return next.handle(req).pipe(
      catchError((error) => {
        let errorMessage = "Unknown error";
        const errorCode = error?.error?.error?.message;
        if (errorCode) {
          switch (errorCode) {
            case "EMAIL_EXISTS":
              errorMessage = "This email already exists";
            case "INVALID_PASSWORD":
              errorMessage = "Invalid password";
            case "EMAIL_NOT_FOUND":
              errorMessage = "Invalid email";
            default:
              console.log(error);
          }
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
