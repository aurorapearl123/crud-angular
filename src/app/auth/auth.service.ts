import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  readonly rootURL = "http://localhost/project/special/kitrol/";
  token = "";

  form: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  constructor(public http: HttpClient, private router: Router) {}

  signIn(username: string, password: string) {
    let body = new FormData();
    body.append("username", username);
    body.append("password", password);
    this.http.post(this.rootURL + "api/v2/login", body).subscribe(response => {
      console.log(response["data"].isAdmin);
      localStorage.setItem("token", response["data"].token);
      localStorage.setItem("username", response["data"].userName);
      localStorage.setItem("isAdmin", response["data"].isAdmin);
      localStorage.setItem("userID", response["data"].userID);
      this.token = response["data"].token;
      //clear the form
      this.form.reset();
      if (response["data"].isAdmin == 1 || response["data"].isAdmin == "1") {
        this.router.navigate(["admin"]);
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isAuthenticated() {
    this.token = localStorage.getItem("token");
    return this.token ? true : false;
  }
}
