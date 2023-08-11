import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { RecipeService } from "./recipes/recipe.service";
import { ErrorInterceptor } from "./shared/error.interceptor";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LoggingService } from "./logging.service";

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // LoggingService,
  ],
  imports: [SharedModule],
})
export class CoreModule {}
