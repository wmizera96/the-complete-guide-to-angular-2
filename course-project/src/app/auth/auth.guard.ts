import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  createUrlTreeFromSnapshot,
} from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard = (
  activatedRoute: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  return inject(AuthService).user.pipe(
    take(1),
    map((user) => {
      if (!!user) return true;

      return createUrlTreeFromSnapshot(activatedRoute, ["/", "auth"]);
    })
  );
};
