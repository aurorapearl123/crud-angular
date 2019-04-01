import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../auth/user.model";
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  readonly rootURL = "http://localhost/project/special/kitrol/";
  constructor(private http: HttpClient) {}

  list: User[];
  getUsers() {
    this.http
      .get(this.rootURL + "api/v2/users")
      .toPromise()
      .then(res => {
        this.list = res["users"] as User[];
        //console.log("the list");
        //console.log(this.list);
      });
  }
  //add user role
  insertRole(userID: string, name: string) {
    let body = new FormData();
    body.append("userID", userID);
    body.append("name", name);
    this.http.post(this.rootURL + "api/v2/users-add-role", body).subscribe(
      response => {
        console.log("response");
        console.log(response);
      },
      error => {
        console.log("error");
        console.log(error);
      }
    );
  }

  getUserRole(userID: string) {
    return this.http.get(this.rootURL + "api/v2/get-role/" + userID);
  }

  addUser(form: NgForm) {
    let body = new FormData();
    body.append("username", form.value.username);

    body.append("firstname", form.value.firstname);
    body.append("middlename", form.value.middlename);
    body.append("lastname", form.value.lastname);
    body.append("isAdmin", form.value.isAdmin);
  }
}
