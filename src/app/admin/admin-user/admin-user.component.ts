import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/shared/users.service";
import { User } from "src/app/auth/user.model";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-user",
  templateUrl: "./admin-user.component.html",
  styleUrls: ["./admin-user.component.css"]
})
export class AdminUserComponent implements OnInit {
  role: object[];
  userID = "";
  userName = "";
  form: FormGroup;

  title = "Patient module list";
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  displayList: [];

  constructor(public service: UsersService, private router: Router) {
    // this.masterSelected = false;
    // this.checklist = [
    //   { id: 1, value: "Add", isSelected: false },
    //   { id: 2, value: "Edit", isSelected: false },
    //   { id: 3, value: "View", isSelected: false },
    //   { id: 4, value: "Delete", isSelected: false }
    // ];
    // this.getCheckedItemList();
  }

  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected)
        this.checkedList.push(this.checklist[i]);
    }

    this.checkedList = this.checkedList;
  }

  updateModule() {
    let ids = [];
    let key;
    for (key in this.checkedList) {
      //console.log(this.checkedList[key].id);
      ids.push(this.checkedList[key].id);
    }
    //console.log(ids);
    const module = "patient" + JSON.stringify(ids);
    console.log("userID");
    console.log(this.userID);
    console.log("the value");
    console.log(module);
    this.service.insertRole(this.userID, module);
  }

  ngOnInit() {
    this.service.getUsers();
  }

  viewRole(user: User) {
    console.log("the view");

    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: "Add", isSelected: false },
      { id: 2, value: "Edit", isSelected: false },
      { id: 3, value: "View", isSelected: false },
      { id: 4, value: "Delete", isSelected: false }
    ];
    this.getCheckedItemList();

    //console.log(user["role"]);
    this.service.getUserRole(user.userID).subscribe(
      response => {
        console.log("response data");

        console.log(response["data"].length);
        if (response["data"].length) {
          const roleName = response["data"][0].roleName;
          if (roleName.indexOf("patient") > -1) {
            const role = roleName.replace("patient", "");
            this.role = JSON.parse(role);
            //loop then check if the array is exist
            console.log("the data");
            console.log(this.checklist);
            for (const chek in this.checklist) {
              for (const _role in this.role) {
                //console.log("the role");
                if (this.role[_role] == this.checklist[chek].id) {
                  this.checklist[chek].isSelected = true;
                  console.log(this.role[_role]);
                }
              }
            }
          }
        }
      },
      error => {
        console.log("the error");
        console.log(error);
      }
    );
    this.userID = user.userID;
    this.userName = user.userName;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["signin"]);
  }
}
