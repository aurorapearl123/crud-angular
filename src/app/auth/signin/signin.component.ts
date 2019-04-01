import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  constructor(public service: AuthService, private router: Router) {}

  ngOnInit() {}

  onSignin() {
    this.service.signIn(
      this.service.form.value.username,
      this.service.form.value.password
    );
  }

  signup() {
    console.log("navigate me");
    this.router.navigate(["signup"]);
  }
}
