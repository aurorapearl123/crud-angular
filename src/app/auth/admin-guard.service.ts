import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["signin"]);
      return false;
    } else {
      const isAdmin = localStorage.getItem("isAdmin");
      if (isAdmin == "1") {
        return this.authService.isAuthenticated();
      } else {
        this.router.navigate([""]);
        return false;
      }
    }
  }
}
