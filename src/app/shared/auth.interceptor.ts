import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if (token) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
